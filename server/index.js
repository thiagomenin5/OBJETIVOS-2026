const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;
const JWT_SECRET = process.env.JWT_SECRET || 'tu-secreto-super-seguro-cambiar-en-produccion';

app.use(cors());
app.use(express.json());

// Base de datos SQLite
const dbPath = path.join(__dirname, 'database.db');
const db = new sqlite3.Database(dbPath);

// Inicializar base de datos
db.serialize(() => {
  // Tabla de usuarios
  db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);

  // Tabla de objetivos
  db.run(`CREATE TABLE IF NOT EXISTS objetivos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    titulo TEXT NOT NULL,
    descripcion TEXT,
    es_principal INTEGER DEFAULT 0,
    completado INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
  )`);

  // Migración: agregar columnas si no existen (para bases de datos existentes)
  db.run(`ALTER TABLE objetivos ADD COLUMN es_principal INTEGER DEFAULT 0`, (err) => {
    // Ignorar error si la columna ya existe
  });
  db.run(`ALTER TABLE objetivos ADD COLUMN completado INTEGER DEFAULT 0`, (err) => {
    // Ignorar error si la columna ya existe
  });
});

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

    db.run(
      'INSERT INTO users (username, password) VALUES (?, ?)',
      [username.trim(), hashedPassword],
      function(err) {
        if (err) {
          if (err.message.includes('UNIQUE constraint')) {
            return res.status(400).json({ error: 'El usuario ya existe. Por favor elige otro nombre de usuario' });
          }
          return res.status(500).json({ error: 'Error al crear usuario' });
        }

        const token = jwt.sign({ id: this.lastID, username: username.trim() }, JWT_SECRET, { expiresIn: '30d' });
        res.json({ token, user: { id: this.lastID, username: username.trim() } });
      }
    );
  } catch (error) {
    console.error('Error en registro:', error);
    res.status(500).json({ error: 'Error al registrar usuario' });
  }
});

// Iniciar sesión
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Usuario y contraseña son requeridos' });
  }

  db.get('SELECT * FROM users WHERE username = ?', [username.trim()], async (err, user) => {
    if (err) {
      console.error('Error en login:', err);
      return res.status(500).json({ error: 'Error en el servidor' });
    }

    if (!user) {
      return res.status(401).json({ error: 'Usuario o contraseña incorrectos' });
    }

    try {
      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        return res.status(401).json({ error: 'Usuario o contraseña incorrectos' });
      }

      const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, { expiresIn: '30d' });
      res.json({ token, user: { id: user.id, username: user.username } });
    } catch (error) {
      console.error('Error al verificar contraseña:', error);
      res.status(500).json({ error: 'Error al verificar contraseña' });
    }
  });
});

// Verificar token
app.get('/api/verify', authenticateToken, (req, res) => {
  res.json({ user: req.user });
});

// ==================== OBJETIVOS ====================

// Obtener todos los objetivos del usuario
app.get('/api/objetivos', authenticateToken, (req, res) => {
  db.all(
    `SELECT * FROM objetivos 
     WHERE user_id = ? 
     ORDER BY 
       completado ASC,
       es_principal DESC,
       created_at DESC`,
    [req.user.id],
    (err, rows) => {
      if (err) {
        return res.status(500).json({ error: 'Error al obtener objetivos' });
      }
      // Convertir valores booleanos de SQLite (0/1) a booleanos JavaScript
      const objetivos = rows.map(obj => ({
        ...obj,
        es_principal: obj.es_principal === 1,
        completado: obj.completado === 1
      }));
      res.json(objetivos);
    }
  );
});

// Obtener un objetivo por ID
app.get('/api/objetivos/:id', authenticateToken, (req, res) => {
  db.get(
    'SELECT * FROM objetivos WHERE id = ? AND user_id = ?',
    [req.params.id, req.user.id],
    (err, row) => {
      if (err) {
        return res.status(500).json({ error: 'Error al obtener objetivo' });
      }
      if (!row) {
        return res.status(404).json({ error: 'Objetivo no encontrado' });
      }
      res.json(row);
    }
  );
});

// Crear nuevo objetivo
app.post('/api/objetivos', authenticateToken, (req, res) => {
  const { titulo, descripcion } = req.body;

  if (!titulo) {
    return res.status(400).json({ error: 'El título es requerido' });
  }

  db.run(
    'INSERT INTO objetivos (user_id, titulo, descripcion) VALUES (?, ?, ?)',
    [req.user.id, titulo, descripcion || ''],
    function(err) {
      if (err) {
        return res.status(500).json({ error: 'Error al crear objetivo' });
      }

      db.get('SELECT * FROM objetivos WHERE id = ?', [this.lastID], (err, row) => {
        if (err) {
          return res.status(500).json({ error: 'Error al obtener objetivo creado' });
        }
        const objetivo = {
          ...row,
          es_principal: row.es_principal === 1,
          completado: row.completado === 1
        };
        res.status(201).json(objetivo);
      });
    }
  );
});

// Actualizar objetivo
app.put('/api/objetivos/:id', authenticateToken, (req, res) => {
  const { titulo, descripcion } = req.body;

  if (!titulo) {
    return res.status(400).json({ error: 'El título es requerido' });
  }

  db.run(
    'UPDATE objetivos SET titulo = ?, descripcion = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ? AND user_id = ?',
    [titulo, descripcion || '', req.params.id, req.user.id],
    function(err) {
      if (err) {
        return res.status(500).json({ error: 'Error al actualizar objetivo' });
      }

      if (this.changes === 0) {
        return res.status(404).json({ error: 'Objetivo no encontrado' });
      }

      db.get('SELECT * FROM objetivos WHERE id = ?', [req.params.id], (err, row) => {
        if (err) {
          return res.status(500).json({ error: 'Error al obtener objetivo actualizado' });
        }
        // Convertir valores booleanos
        const objetivo = {
          ...row,
          es_principal: row.es_principal === 1,
          completado: row.completado === 1
        };
        res.json(objetivo);
      });
    }
  );
});

// Marcar objetivo como principal (solo uno a la vez)
app.patch('/api/objetivos/:id/principal', authenticateToken, (req, res) => {
  db.serialize(() => {
    // Primero, desmarcar todos los objetivos principales del usuario
    db.run(
      'UPDATE objetivos SET es_principal = 0 WHERE user_id = ?',
      [req.user.id],
      (err) => {
        if (err) {
          return res.status(500).json({ error: 'Error al actualizar objetivos' });
        }

        // Luego, marcar el objetivo seleccionado como principal
        db.run(
          'UPDATE objetivos SET es_principal = 1, updated_at = CURRENT_TIMESTAMP WHERE id = ? AND user_id = ?',
          [req.params.id, req.user.id],
          function(err) {
            if (err) {
              return res.status(500).json({ error: 'Error al marcar objetivo como principal' });
            }

            if (this.changes === 0) {
              return res.status(404).json({ error: 'Objetivo no encontrado' });
            }

            db.get('SELECT * FROM objetivos WHERE id = ?', [req.params.id], (err, row) => {
              if (err) {
                return res.status(500).json({ error: 'Error al obtener objetivo actualizado' });
              }
              const objetivo = {
                ...row,
                es_principal: row.es_principal === 1,
                completado: row.completado === 1
              };
              res.json(objetivo);
            });
          }
        );
      }
    );
  });
});

// Marcar objetivo como completado
app.patch('/api/objetivos/:id/completado', authenticateToken, (req, res) => {
  const { completado } = req.body;
  const completadoValue = completado ? 1 : 0;

  db.run(
    'UPDATE objetivos SET completado = ?, es_principal = 0, updated_at = CURRENT_TIMESTAMP WHERE id = ? AND user_id = ?',
    [completadoValue, req.params.id, req.user.id],
    function(err) {
      if (err) {
        return res.status(500).json({ error: 'Error al actualizar objetivo' });
      }

      if (this.changes === 0) {
        return res.status(404).json({ error: 'Objetivo no encontrado' });
      }

      db.get('SELECT * FROM objetivos WHERE id = ?', [req.params.id], (err, row) => {
        if (err) {
          return res.status(500).json({ error: 'Error al obtener objetivo actualizado' });
        }
        const objetivo = {
          ...row,
          es_principal: row.es_principal === 1,
          completado: row.completado === 1
        };
        res.json(objetivo);
      });
    }
  );
});

// Eliminar objetivo
app.delete('/api/objetivos/:id', authenticateToken, (req, res) => {
  db.run(
    'DELETE FROM objetivos WHERE id = ? AND user_id = ?',
    [req.params.id, req.user.id],
    function(err) {
      if (err) {
        return res.status(500).json({ error: 'Error al eliminar objetivo' });
      }

      if (this.changes === 0) {
        return res.status(404).json({ error: 'Objetivo no encontrado' });
      }

      res.json({ message: 'Objetivo eliminado exitosamente' });
    }
  );
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

