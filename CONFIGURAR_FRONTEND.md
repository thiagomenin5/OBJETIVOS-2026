# 🎨 Configurar Frontend (Puerto 3000 / Cliente)

Ahora necesitas desplegar el frontend para que se conecte con tu backend.

## 📝 Paso 1: Desplegar Frontend en Render

1. **Ve a Render Dashboard**: https://dashboard.render.com

2. **Click en "New +" → "Static Site"**

3. **Conecta tu repositorio**:
   - Click en "Connect account" si aún no lo has hecho
   - Selecciona tu repositorio: `OBJETIVOS-2026`

4. **Configuración**:
   - **Name**: `objetivo-2026-frontend` (o el nombre que prefieras)
   - **Branch**: `main`
   - **Root Directory**: `client`
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `dist`
   - **Plan**: Free

5. **Variables de Entorno**:
   - Click en "Advanced" si no aparece automáticamente
   - Click en "Add Environment Variable"
   - **Key**: `VITE_API_URL`
   - **Value**: `https://TU-BACKEND-URL.onrender.com/api`
     - ⚠️ **IMPORTANTE**: Reemplaza `TU-BACKEND-URL` con la URL real de tu backend
     - Ejemplo: Si tu backend es `objetivo-2026-backend.onrender.com`
     - Entonces el valor sería: `https://objetivo-2026-backend.onrender.com/api`
     - ✅ Debe terminar en `/api`

6. **Click en "Create Static Site"**

7. **Espera** (2-3 minutos):
   - Render construirá tu frontend
   - Te dará una URL como: `https://objetivo-2026-frontend.onrender.com`

## 🔍 ¿Dónde encontrar la URL de tu backend?

1. Ve a Render Dashboard
2. Click en tu servicio backend (objetivo-2026-backend)
3. En la parte superior verás la URL, algo como:
   - `https://objetivo-2026-backend.onrender.com`
4. **Copia esa URL** y agrega `/api` al final

## ✅ Verificación

Después de que Render termine de construir:

1. **Abre la URL del frontend** (la que Render te dio)
2. Deberías ver la página de login
3. Prueba crear una cuenta o iniciar sesión
4. Si funciona, ¡felicidades! 🎉

## ⚠️ Problemas Comunes

### El frontend no se conecta al backend:

1. **Verifica la URL del backend**:
   - Debe ser la URL completa: `https://tu-backend.onrender.com/api`
   - Debe terminar en `/api`
   - Debe usar `https://` (no `http://`)

2. **Revisa la variable de entorno**:
   - En Render → Frontend → Environment
   - Debe existir `VITE_API_URL`
   - El valor debe ser correcto

3. **Reconstruye el frontend**:
   - Si cambiaste `VITE_API_URL`, Render debe reconstruir
   - Ve a "Manual Deploy" → "Clear build cache & deploy"

### Error en el build:

- Verifica que "Root Directory" sea `client`
- Verifica que "Build Command" sea: `npm install && npm run build`
- Verifica que "Publish Directory" sea: `dist`

## 📋 Resumen de Configuración

```
Name: objetivo-2026-frontend
Root Directory: client
Build Command: npm install && npm run build
Publish Directory: dist
Environment Variable:
  - Key: VITE_API_URL
  - Value: https://tu-backend-url.onrender.com/api
```

## 🎯 Próximos Pasos

Una vez que el frontend esté funcionando:

1. ✅ Prueba crear una cuenta
2. ✅ Prueba iniciar sesión
3. ✅ Crea algunos objetivos
4. ✅ Prueba todas las funcionalidades

¡Ya tendrás tu aplicación completa online! 🚀

