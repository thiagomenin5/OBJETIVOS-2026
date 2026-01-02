const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;
const JWT_SECRET = process.env.JWT_SECRET || 'tu-secreto-super-seguro-cambiar-en-produccion';

app.use(cors());
app.use(express.json());

// Base de datos PostgreSQL
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.DATABASE_URL ? { rejectUnauthorized: false } : false
});

// Inicializar base de datos
const initDatabase = async () => {
  try {
    // Tabla de usuarios
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(50) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Tabla de objetivos
    await pool.query(`
      CREATE TABLE IF NOT EXISTS objetivos (
        id SERIAL PRIMARY KEY,
        user_id INTEGER NOT NULL,
        titulo VARCHAR(200) NOT NULL,
        descripcion TEXT,
        es_principal BOOLEAN DEFAULT FALSE,
        completado BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      )
    `);

    console.log('Base de datos inicializada correctamente');
  } catch (error) {
    console.error('Error al inicializar base de datos:', error);
  }
};

initDatabase();

// Middleware de autenticación
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Token de acceso requerido' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Token inválido o expirado' });
    }
    req.user = user;
    next();
  });
};

// ==================== AUTENTICACIÓN ====================

// Registrar nuevo usuario
app.post('/api/register', async (req, res) => {
  const { username, password } = req.body;

  // Validaciones
  if (!username || !password) {
    return res.status(400).json({ error: 'Usuario y contraseña son requeridos' });
  }

  // Validar formato de username (solo letras, números y guiones, 3-20 caracteres)
  const usernameRegex = /^[a-zA-Z0-9_-]{3,20}$/;
  if (!usernameRegex.test(username)) {
    return res.status(400).json({ 
      error: 'El usuario debe tener entre 3 y 20 caracteres y solo puede contener letras, números, guiones y guiones bajos' 
    });
  }

  // Validar longitud de contraseña
  if (password.length < 6) {
    return res.status(400).json({ error: 'La contraseña debe tener al menos 6 caracteres' });
  }

  if (password.length > 100) {
    return res.status(400).json({ error: 'La contraseña es demasiado larga' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await pool.query(
      'INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id, username',
      [username.trim(), hashedPassword]
    );

    const user = result.rows[0];
    const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, { expiresIn: '30d' });
    res.json({ token, user: { id: user.id, username: user.username } });
  } catch (error) {
    console.error('Error en registro:', error);
    if (error.code === '23505') { // Unique constraint violation
      return res.status(400).json({ error: 'El usuario ya existe. Por favor elige otro nombre de usuario' });
    }
    res.status(500).json({ error: 'Error al registrar usuario' });
  }
});

// Iniciar sesión
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Usuario y contraseña son requeridos' });
  }

  try {
    const result = await pool.query('SELECT * FROM users WHERE username = $1', [username.trim()]);
    const user = result.rows[0];

    if (!user) {
      return res.status(401).json({ error: 'Usuario o contraseña incorrectos' });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ error: 'Usuario o contraseña incorrectos' });
    }

    const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, { expiresIn: '30d' });
    res.json({ token, user: { id: user.id, username: user.username } });
  } catch (error) {
    console.error('Error en login:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
});

// Verificar token
app.get('/api/verify', authenticateToken, (req, res) => {
  res.json({ user: req.user });
});

// ==================== OBJETIVOS ====================

// Obtener todos los objetivos del usuario
app.get('/api/objetivos', authenticateToken, async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT * FROM objetivos 
       WHERE user_id = $1 
       ORDER BY 
         completado ASC,
         es_principal DESC,
         created_at DESC`,
      [req.user.id]
    );

    const objetivos = result.rows.map(obj => ({
      ...obj,
      es_principal: obj.es_principal || false,
      completado: obj.completado || false
    }));

    res.json(objetivos);
  } catch (error) {
    console.error('Error al obtener objetivos:', error);
    res.status(500).json({ error: 'Error al obtener objetivos' });
  }
});

// Obtener un objetivo por ID
app.get('/api/objetivos/:id', authenticateToken, async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM objetivos WHERE id = $1 AND user_id = $2',
      [req.params.id, req.user.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Objetivo no encontrado' });
    }

    const objetivo = {
      ...result.rows[0],
      es_principal: result.rows[0].es_principal || false,
      completado: result.rows[0].completado || false
    };

    res.json(objetivo);
  } catch (error) {
    console.error('Error al obtener objetivo:', error);
    res.status(500).json({ error: 'Error al obtener objetivo' });
  }
});

// Crear nuevo objetivo
app.post('/api/objetivos', authenticateToken, async (req, res) => {
  const { titulo, descripcion } = req.body;

  if (!titulo) {
    return res.status(400).json({ error: 'El título es requerido' });
  }

  try {
    const result = await pool.query(
      'INSERT INTO objetivos (user_id, titulo, descripcion) VALUES ($1, $2, $3) RETURNING *',
      [req.user.id, titulo, descripcion || '']
    );

    const objetivo = {
      ...result.rows[0],
      es_principal: result.rows[0].es_principal || false,
      completado: result.rows[0].completado || false
    };

    res.status(201).json(objetivo);
  } catch (error) {
    console.error('Error al crear objetivo:', error);
    res.status(500).json({ error: 'Error al crear objetivo' });
  }
});

// Actualizar objetivo
app.put('/api/objetivos/:id', authenticateToken, async (req, res) => {
  const { titulo, descripcion } = req.body;

  if (!titulo) {
    return res.status(400).json({ error: 'El título es requerido' });
  }

  try {
    const result = await pool.query(
      'UPDATE objetivos SET titulo = $1, descripcion = $2, updated_at = CURRENT_TIMESTAMP WHERE id = $3 AND user_id = $4 RETURNING *',
      [titulo, descripcion || '', req.params.id, req.user.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Objetivo no encontrado' });
    }

    const objetivo = {
      ...result.rows[0],
      es_principal: result.rows[0].es_principal || false,
      completado: result.rows[0].completado || false
    };

    res.json(objetivo);
  } catch (error) {
    console.error('Error al actualizar objetivo:', error);
    res.status(500).json({ error: 'Error al actualizar objetivo' });
  }
});

// Marcar objetivo como principal (solo uno a la vez)
app.patch('/api/objetivos/:id/principal', authenticateToken, async (req, res) => {
  try {
    // Primero, desmarcar todos los objetivos principales del usuario
    await pool.query(
      'UPDATE objetivos SET es_principal = FALSE WHERE user_id = $1',
      [req.user.id]
    );

    // Luego, marcar el objetivo seleccionado como principal
    const result = await pool.query(
      'UPDATE objetivos SET es_principal = TRUE, updated_at = CURRENT_TIMESTAMP WHERE id = $1 AND user_id = $2 RETURNING *',
      [req.params.id, req.user.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Objetivo no encontrado' });
    }

    const objetivo = {
      ...result.rows[0],
      es_principal: result.rows[0].es_principal || false,
      completado: result.rows[0].completado || false
    };

    res.json(objetivo);
  } catch (error) {
    console.error('Error al marcar como principal:', error);
    res.status(500).json({ error: 'Error al marcar objetivo como principal' });
  }
});

// Marcar objetivo como completado
app.patch('/api/objetivos/:id/completado', authenticateToken, async (req, res) => {
  const { completado } = req.body;
  const completadoValue = completado === true || completado === 'true';

  try {
    const result = await pool.query(
      'UPDATE objetivos SET completado = $1, es_principal = FALSE, updated_at = CURRENT_TIMESTAMP WHERE id = $2 AND user_id = $3 RETURNING *',
      [completadoValue, req.params.id, req.user.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Objetivo no encontrado' });
    }

    const objetivo = {
      ...result.rows[0],
      es_principal: result.rows[0].es_principal || false,
      completado: result.rows[0].completado || false
    };

    res.json(objetivo);
  } catch (error) {
    console.error('Error al actualizar estado:', error);
    res.status(500).json({ error: 'Error al actualizar objetivo' });
  }
});

// Eliminar objetivo
app.delete('/api/objetivos/:id', authenticateToken, async (req, res) => {
  try {
    const result = await pool.query(
      'DELETE FROM objetivos WHERE id = $1 AND user_id = $2 RETURNING id',
      [req.params.id, req.user.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Objetivo no encontrado' });
    }

    res.json({ message: 'Objetivo eliminado exitosamente' });
  } catch (error) {
    console.error('Error al eliminar objetivo:', error);
    res.status(500).json({ error: 'Error al eliminar objetivo' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

