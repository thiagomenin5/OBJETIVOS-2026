# 🎨 Configurar Frontend para Usar el Backend

Tu backend está desplegado en: **https://objetivos-2026.onrender.com**

Ahora necesitas configurar el frontend para que se conecte a esta URL.

## 📝 Paso 1: Crear Static Site en Render

1. **Ve a Render Dashboard**: https://dashboard.render.com
2. **Click en "New +"** (arriba a la derecha)
3. **Selecciona "Static Site"**

## 📝 Paso 2: Conectar Repositorio

1. Si aún no lo has hecho, **conecta tu cuenta de GitHub**
2. **Selecciona tu repositorio**: `thiagomenin5/OBJETIVOS-2026`
3. Click en "Connect"

## 📝 Paso 3: Configuración Básica

Configura estos valores:

- **Name**: `objetivo-2026-frontend` (o el nombre que prefieras)
- **Branch**: `main`
- **Root Directory**: `client` ⚠️ **IMPORTANTE**
- **Build Command**: `npm install && npm run build`
- **Publish Directory**: `dist`
- **Plan**: Free

## 📝 Paso 4: Variable de Entorno (MUY IMPORTANTE)

**Antes de crear**, agrega la variable de entorno:

1. **Busca la sección "Environment Variables"** (puede estar en "Advanced")
2. **Click en "Add Environment Variable"**
3. Configura:
   - **Key**: `VITE_API_URL`
   - **Value**: `https://objetivos-2026.onrender.com/api`
     - ⚠️ **IMPORTANTE**: Debe terminar en `/api`
     - ✅ URL completa: `https://objetivos-2026.onrender.com/api`

4. **Click en "Add" o "Save"**

## 📝 Paso 5: Crear el Static Site

1. **Revisa que todo esté correcto**:
   - Root Directory: `client`
   - Build Command: `npm install && npm run build`
   - Publish Directory: `dist`
   - Variable de entorno: `VITE_API_URL = https://objetivos-2026.onrender.com/api`

2. **Click en "Create Static Site"**

3. **Espera 2-3 minutos** mientras Render construye tu frontend

## ✅ Verificación

Después de que Render termine:

1. **Render te dará una URL** como: `https://objetivo-2026-frontend.onrender.com`
2. **Abre esa URL en tu navegador**
3. **Prueba crear una cuenta o iniciar sesión**
4. Si funciona, ¡felicidades! 🎉

## 🔍 Si No Funciona

### Verifica la Variable de Entorno:

1. Ve a tu Static Site en Render
2. Click en "Environment"
3. Debe aparecer: `VITE_API_URL = https://objetivos-2026.onrender.com/api`

### Verifica que el Backend Esté Funcionando:

1. Abre: https://objetivos-2026.onrender.com/api/verify
2. Deberías ver un error de autenticación (eso es bueno, significa que el servidor funciona)
3. Si ves un error 404 o no carga, el backend no está funcionando

### Reconstruye el Frontend:

Si cambiaste la variable de entorno después de crear:
1. Ve a "Manual Deploy"
2. Click en "Clear build cache & deploy"
3. Espera a que termine

## 📋 Resumen de Configuración

```
Nombre: objetivo-2026-frontend
Root Directory: client
Build Command: npm install && npm run build
Publish Directory: dist
Environment Variable:
  Key: VITE_API_URL
  Value: https://objetivos-2026.onrender.com/api
```

## 🎯 Tu URL del Backend

Según tu servicio, tu backend está en:
**https://objetivos-2026.onrender.com**

Por lo tanto, la variable debe ser:
**https://objetivos-2026.onrender.com/api**

¡Eso es todo! Una vez configurado, tu frontend se conectará automáticamente al backend. 🚀

