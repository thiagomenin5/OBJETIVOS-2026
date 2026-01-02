# 🔧 Solución al Error de Render

## Problema

Error: `Cannot find module '/opt/render/project/src/server/server/index.js'`

Esto ocurre cuando Render duplica la ruta `server` en el comando de inicio.

## ✅ Solución

Tienes **DOS opciones** dependiendo de si Render tiene la opción "Root Directory":

### Opción A: Con "Root Directory" (Recomendado)

1. Ve a tu servicio en Render
2. Click en "Settings"
3. Busca "Root Directory" y pon: `server`
4. En "Start Command" cambia a: `node index.js`
5. En "Build Command" cambia a: `npm install`
6. Guarda los cambios
7. Render reiniciará automáticamente

### Opción B: Sin "Root Directory"

1. Ve a tu servicio en Render
2. Click en "Settings"
3. Si NO hay opción "Root Directory" o está vacío:
4. En "Start Command" usa: `cd server && node index.js`
5. En "Build Command" usa: `cd server && npm install`
6. Guarda los cambios

## 📋 Resumen de Configuración Correcta

### Si tienes "Root Directory":
- **Root Directory**: `server`
- **Build Command**: `npm install`
- **Start Command**: `node index.js`

### Si NO tienes "Root Directory":
- **Root Directory**: (vacío o no configurado)
- **Build Command**: `cd server && npm install`
- **Start Command**: `cd server && node index.js`

## 🔄 Pasos para Corregir

1. Ve a tu servicio en Render Dashboard
2. Click en el nombre del servicio
3. Click en "Settings" (en el menú lateral)
4. Busca "Build & Deploy"
5. Modifica los comandos según la opción que corresponda
6. Click en "Save Changes"
7. Render reconstruirá automáticamente

¡Eso debería solucionar el problema! 🎉

