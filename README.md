# 🎯 Objetivos 2026

Una aplicación web moderna y motivacional para gestionar tus objetivos del 2026. Diseñada para mantenerte enfocado y motivado todos los días.

## ✨ Características

- 🔐 **Autenticación de usuarios**: Cada usuario tiene sus propios objetivos privados
- 📝 **CRUD completo**: Crear, leer, actualizar y eliminar objetivos
- 🎨 **Diseño moderno y motivacional**: Interfaz atractiva con gradientes y animaciones
- 📱 **Responsive**: Funciona perfectamente en desktop, tablet y móvil
- 💾 **Base de datos SQLite**: Fácil de desplegar y mantener
- 🔒 **Seguro**: Autenticación JWT y contraseñas encriptadas

## 🚀 Inicio Rápido

### Prerrequisitos

- Node.js (v16 o superior)
- npm o yarn

### Instalación

1. Instala todas las dependencias:
```bash
npm run install-all
```

2. Configura las variables de entorno (opcional):
```bash
cd server
cp .env.example .env
# Edita .env con tus valores
```

3. Inicia el servidor de desarrollo (backend y frontend):
```bash
npm run dev
```

O inicia por separado:

**Backend:**
```bash
npm run server
```

**Frontend:**
```bash
npm run client
```

4. Abre tu navegador en `http://localhost:3000`

## 📦 Estructura del Proyecto

```
objetivo-2026/
├── server/           # Backend (Node.js + Express + SQLite)
│   ├── index.js      # Servidor principal
│   └── package.json
├── client/           # Frontend (React + Vite)
│   ├── src/
│   │   ├── components/
│   │   ├── services/
│   │   └── App.jsx
│   └── package.json
└── package.json      # Scripts principales
```

## 🌐 Despliegue en la Nube

### 🚀 Guía Rápida

Para una guía paso a paso completa, consulta:
- **DEPLOY_SIMPLE.md** - Guía rápida para Render (recomendado para principiantes)
- **DEPLOY.md** - Guía completa con múltiples opciones

### Opciones recomendadas:

1. **Render** ⭐ (Más fácil - Gratis)
   - Soporta SQLite
   - Despliegue automático desde GitHub
   - Ideal para comenzar

2. **Railway** (Fácil - $5/mes con crédito gratuito)
   - Buena para apps que necesitan estar siempre activas

3. **Vercel** (Frontend) + **Render/Railway** (Backend)
   - Optimizado para producción profesional

### Pasos generales:

1. **Preparar:**
   - Genera un `JWT_SECRET` seguro (usa randomkeygen.com)
   - Sube tu código a GitHub

2. **Variables de entorno necesarias:**
   - Backend: `PORT=3001`, `JWT_SECRET=tu-secreto-seguro`
   - Frontend: `VITE_API_URL=https://tu-backend-url.com/api`

3. **Base de datos:** SQLite funciona para empezar. Para producción escalable, considera PostgreSQL.

## 🛠️ Tecnologías Utilizadas

- **Frontend:**
  - React 18
  - Vite
  - Axios
  - CSS3 (Gradientes, Animaciones)

- **Backend:**
  - Node.js
  - Express
  - SQLite3
  - JWT (JSON Web Tokens)
  - bcryptjs (Encriptación de contraseñas)

## 📝 Uso

1. **Registrarse**: Crea una cuenta con usuario y contraseña
2. **Iniciar Sesión**: Accede con tus credenciales
3. **Crear Objetivos**: Haz clic en "Nuevo Objetivo" y completa el formulario
4. **Editar**: Haz clic en el ícono de editar (✏️) en cualquier objetivo
5. **Eliminar**: Haz clic en el ícono de eliminar (🗑️) para borrar un objetivo

## 🔒 Seguridad

- Las contraseñas se encriptan con bcrypt
- Los tokens JWT expiran después de 30 días
- Cada usuario solo puede ver y modificar sus propios objetivos
- Validación de datos en frontend y backend

## 📄 Licencia

ISC

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Siéntete libre de hacer un fork y enviar un pull request.

---

¡Mantén el foco y alcanza tus objetivos! 🚀

