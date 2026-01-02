# 🚀 Guía de Despliegue - Objetivos 2026

Esta guía te ayudará a subir tu aplicación a la nube paso a paso.

## 📋 Opciones Recomendadas

### Opción 1: Render (Recomendado - Gratis) ⭐
- **Ventajas**: Gratis, fácil de usar, soporta SQLite, despliegue automático desde GitHub
- **Ideal para**: Proyectos pequeños y medianos
- **Límite gratuito**: Servicio duerme después de 15 min de inactividad

### Opción 2: Railway
- **Ventajas**: Muy fácil, $5/mes con crédito gratuito mensual
- **Ideal para**: Aplicaciones que necesitan estar siempre activas

### Opción 3: Vercel (Frontend) + Render/Railway (Backend)
- **Ventajas**: Frontend optimizado, backend separado
- **Ideal para**: Producción profesional

---

## 🎯 Opción 1: Despliegue en Render (Completo)

### Paso 1: Preparar el código

1. **Crear archivo `.env` en la carpeta `server/`**:
```bash
cd server
```

Crea un archivo `.env` con:
```
PORT=3001
JWT_SECRET=tu-secreto-super-seguro-y-aleatorio-aqui-cambiar-por-uno-real
```

**⚠️ IMPORTANTE**: Cambia `JWT_SECRET` por una cadena aleatoria larga y segura (puedes usar: https://randomkeygen.com/)

### Paso 2: Crear archivo para Render

Ya está creado: `render.yaml` (ver abajo)

### Paso 3: Subir a GitHub

1. Crea una cuenta en GitHub si no tienes una
2. Crea un nuevo repositorio
3. En tu terminal, ejecuta:

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/TU_USUARIO/TU_REPOSITORIO.git
git push -u origin main
```

### Paso 4: Desplegar en Render

1. Ve a [render.com](https://render.com) y crea una cuenta
2. Haz clic en "New +" → "Web Service"
3. Conecta tu repositorio de GitHub
4. Configuración:
   - **Name**: objetivo-2026 (o el nombre que prefieras)
   - **Environment**: Node
   - **Build Command**: `cd server && npm install`
   - **Start Command**: `cd server && node index.js`
   - **Plan**: Free

5. En "Advanced" → "Environment Variables", agrega:
   - `PORT`: `3001`
   - `JWT_SECRET`: (tu secreto aleatorio)

6. Haz clic en "Create Web Service"

7. **Para el Frontend**:
   - Ve a "New +" → "Static Site"
   - Conecta el mismo repositorio
   - **Root Directory**: `client`
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `dist`

### Paso 5: Configurar URLs

Después del despliegue, Render te dará URLs como:
- Backend: `https://objetivo-2026.onrender.com`
- Frontend: `https://objetivo-2026-frontend.onrender.com`

Actualiza `client/vite.config.js` o crea un archivo `.env` en `client/`:
```
VITE_API_URL=https://tu-backend-url.onrender.com/api
```

---

## 🎯 Opción 2: Despliegue en Railway

### Paso 1: Preparar

1. Instala Railway CLI: `npm i -g @railway/cli`
2. Login: `railway login`
3. Inicializa: `railway init`
4. Despliega backend: `railway up` (desde la carpeta server)
5. Despliega frontend: Crea otro proyecto, desde la carpeta client

---

## 🎯 Opción 3: Vercel (Frontend) + Render (Backend)

### Frontend en Vercel:

1. Ve a [vercel.com](https://vercel.com)
2. Importa tu repositorio
3. **Root Directory**: `client`
4. **Build Command**: `npm run build`
5. **Output Directory**: `dist`
6. Agrega variable de entorno: `VITE_API_URL=https://tu-backend-url.onrender.com/api`

### Backend en Render:
Sigue los pasos de la Opción 1 para el backend

---

## 🔧 Configuración Adicional Necesaria

### 1. Actualizar CORS en el backend

Ya está configurado para aceptar todas las peticiones, pero puedes ajustarlo si necesitas.

### 2. Variables de Entorno

Asegúrate de tener estas variables en producción:

**Backend (`server/.env`)**:
```
PORT=3001
JWT_SECRET=tu-secreto-super-seguro-aleatorio
```

**Frontend (`client/.env.production`)** (opcional):
```
VITE_API_URL=https://tu-backend-url.com/api
```

### 3. Base de Datos

SQLite funciona bien para pequeñas aplicaciones. Para producción con muchos usuarios, considera:
- PostgreSQL (gratis en Render, Railway, Supabase)
- MongoDB Atlas (gratis hasta cierto límite)

---

## ✅ Checklist Pre-Despliegue

- [ ] Cambiar `JWT_SECRET` por uno seguro
- [ ] Verificar que `.env` esté en `.gitignore`
- [ ] Probar la aplicación localmente
- [ ] Construir el frontend: `cd client && npm run build`
- [ ] Verificar que no haya errores de compilación

---

## 🔒 Seguridad en Producción

1. **JWT_SECRET**: Debe ser una cadena larga y aleatoria
2. **HTTPS**: Render y Vercel lo proporcionan automáticamente
3. **Variables de entorno**: Nunca subas `.env` a GitHub
4. **Base de datos**: En producción considera PostgreSQL

---

## 🆘 Troubleshooting

### El backend no arranca:
- Verifica que el `PORT` esté configurado
- Revisa los logs en Render/Railway
- Asegúrate de que las dependencias estén instaladas

### El frontend no conecta al backend:
- Verifica que `VITE_API_URL` apunte a la URL correcta
- Asegúrate de que el backend esté funcionando
- Revisa la consola del navegador para errores CORS

### La base de datos no persiste:
- En Render, la base de datos puede resetearse en el plan gratuito
- Considera usar PostgreSQL para persistencia garantizada

---

## 📚 Recursos Útiles

- [Render Documentation](https://render.com/docs)
- [Vercel Documentation](https://vercel.com/docs)
- [Railway Documentation](https://docs.railway.app)

¡Buena suerte con tu despliegue! 🚀

