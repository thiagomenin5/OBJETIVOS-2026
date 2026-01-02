# 🔧 Solución al Error "Timed out"

## ❌ Problema Detectado

El error "Timed out" se debe a que tu **Start Command está mal configurado**.

### Configuración Actual (INCORRECTA):
- **Root Directory**: `server` ✅
- **Build Command**: `server/ $ npm install` ❌
- **Start Command**: `server/ $ node server/index.js` ❌❌❌

### Por qué falla:
Si el Root Directory ya es `server`, entonces Render ya está dentro de esa carpeta. Cuando ejecutas `node server/index.js`, está buscando `server/server/index.js` que no existe, causando que el proceso se quede colgado y termine en timeout.

## ✅ Solución

### Paso 1: Corregir los Comandos

1. Ve a tu servicio en Render
2. Click en **"Settings"**
3. Click en **"Build & Deploy"** (en el menú lateral)
4. Edita estos campos:

#### Build Command:
- Click en "Edit" al lado de "Build Command"
- Cambia de: `server/ $ npm install`
- A: `npm install`
- Guarda

#### Start Command:
- Click en "Edit" al lado de "Start Command"
- Cambia de: `server/ $ node server/index.js`
- A: `node index.js`
- Guarda

### Paso 2: Guardar y Re-desplegar

1. Render debería detectar los cambios automáticamente
2. O ve a "Manual Deploy" → "Deploy latest commit"

## 📋 Configuración Correcta

Cuando **Root Directory = `server`**:

```
Root Directory: server
Build Command: npm install
Start Command: node index.js
```

**NO uses `server/` ni `cd server` en los comandos porque ya estás en esa carpeta.**

## 🔍 Por qué esto funciona

- **Root Directory = `server`** significa que Render ejecuta los comandos DESDE dentro de la carpeta `server`
- Por lo tanto, `node index.js` busca `server/index.js` ✅
- Pero `node server/index.js` buscaría `server/server/index.js` ❌ (no existe)

## ✅ Verificación

Después de cambiar los comandos:

1. El despliegue debería completarse en 3-5 minutos
2. Los logs deberían mostrar: "Your service is live at..."
3. El estado cambiará a "Live" (verde)

## 🎯 Resumen Rápido

**Cambia:**
- Build Command: `npm install` (sin `server/`)
- Start Command: `node index.js` (sin `server/` ni `node server/`)

¡Esto debería solucionar el timeout! 🚀

