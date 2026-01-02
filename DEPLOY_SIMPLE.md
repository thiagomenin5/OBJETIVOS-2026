# 🚀 Despliegue Rápido - Objetivos 2026

## Guía Paso a Paso (Render - Más Fácil)

### 📝 Paso 1: Preparar Secretos

1. Genera un secreto seguro para JWT:
   - Ve a: https://randomkeygen.com/
   - Copia una "CodeIgniter Encryption Keys" (64 caracteres)
   - Guárdalo, lo necesitarás después

### 📝 Paso 2: Subir a GitHub

1. **Abre GitHub Desktop o terminal Git**

2. **Si es la primera vez**:
```bash
git init
git add .
git commit -m "Primera versión"
```

3. **Crea repositorio en GitHub.com**:
   - Ve a github.com
   - Click en "+" → "New repository"
   - Nómbralo: `objetivo-2026`
   - NO marques "Initialize with README"
   - Click "Create repository"

4. **Conecta y sube**:
```bash
git remote add origin https://github.com/TU_USUARIO/objetivo-2026.git
git branch -M main
git push -u origin main
```

### 📝 Paso 3: Desplegar Backend en Render

1. **Ve a render.com** y crea cuenta (puedes usar GitHub)

2. **Nuevo Web Service**:
   - Click "New +" → "Web Service"
   - Click "Connect account" si usas GitHub
   - Selecciona tu repositorio `objetivo-2026`

3. **Configuración**:
   - **Name**: `objetivo-2026-backend`
   - **Region**: El más cercano a ti
   - **Branch**: `main`
   - **Root Directory**: `server` (IMPORTANTE - deja esto vacío si no aparece la opción)
   - **Runtime**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `node index.js` (si Root Directory es `server`) O `cd server && node index.js` (si Root Directory está vacío)
   - **Plan**: Free

4. **Variables de Entorno** (Click en "Advanced"):
   - **Key**: `JWT_SECRET`
   - **Value**: (pega el secreto que generaste en Paso 1)
   - Click "Add Another"
   - **Key**: `PORT`
   - **Value**: `3001`

5. **Click "Create Web Service"**

6. **Espera a que termine** (2-3 minutos)
   - Verás la URL: `https://objetivo-2026-backend.onrender.com`
   - **¡Cópiala!** La necesitarás después

### 📝 Paso 4: Desplegar Frontend en Render

1. **En Render, click "New +" → "Static Site"**

2. **Configuración**:
   - **Name**: `objetivo-2026-frontend`
   - Conecta el mismo repositorio
   - **Branch**: `main`
   - **Root Directory**: `client`
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `dist`
   - **Plan**: Free

3. **Variables de Entorno**:
   - **Key**: `VITE_API_URL`
   - **Value**: `https://objetivo-2026-backend.onrender.com/api`
   (Reemplaza con la URL real de tu backend del Paso 3)

4. **Click "Create Static Site"**

5. **Espera** (2-3 minutos)
   - Obtendrás una URL como: `https://objetivo-2026-frontend.onrender.com`

### 🎉 ¡Listo!

Abre la URL del frontend y tu aplicación estará online.

---

## ⚠️ Notas Importantes

1. **Primera vez que abres la app**: El backend puede tardar 30-60 segundos en "despertar" (plan gratuito)

2. **Base de datos**: Se crea automáticamente. En el plan gratuito se resetea si el servicio está inactivo mucho tiempo.

3. **URLs**: Render puede darte URLs diferentes, úsalas según aparezcan.

4. **Actualizar código**: Cada vez que hagas `git push`, Render reconstruye automáticamente.

---

## 🔧 Si algo falla

**Backend no funciona**:
- Revisa los logs en Render (tab "Logs")
- Verifica que `JWT_SECRET` esté configurado
- Asegúrate que "Root Directory" sea `server`

**Frontend no conecta**:
- Verifica que `VITE_API_URL` tenga la URL correcta del backend
- Asegúrate que termine en `/api`
- Revisa la consola del navegador (F12)

**¿Necesitas ayuda?** Revisa DEPLOY.md para más opciones y detalles.

