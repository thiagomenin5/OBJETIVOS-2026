# 🔐 Dónde Guardar el JWT_SECRET

Tu secreto JWT es: `A31uh0Tj4Xan9OIxHpp0XKjDSHFRehe0`

## 📍 Lugar 1: Render (Producción) ⭐ IMPORTANTE

Este es el **más importante** porque es donde está tu aplicación online.

### Pasos:

1. Ve a tu Dashboard de Render: https://dashboard.render.com
2. Click en tu servicio backend (objetivo-2026-backend)
3. En el menú lateral, click en **"Environment"**
4. En la sección "Environment Variables", busca si ya existe `JWT_SECRET`
   - Si existe, click en el lápiz (editar) y reemplázalo
   - Si NO existe, click en **"Add Environment Variable"**
5. Configura:
   - **Key**: `JWT_SECRET`
   - **Value**: `A31uh0Tj4Xan9OIxHpp0XKjDSHFRehe0`
6. Click en **"Save Changes"**
7. Render reiniciará automáticamente tu servicio

✅ **Listo para producción**

---

## 📍 Lugar 2: Local (Opcional - Solo para desarrollo)

Si quieres usar el mismo secreto en tu computadora local:

1. Ve a la carpeta `server/`
2. Crea un archivo llamado `.env` (si no existe)
3. Agrega esta línea:
   ```
   JWT_SECRET=A31uh0Tj4Xan9OIxHpp0XKjDSHFRehe0
   PORT=3001
   ```

### ¿Cómo crear el archivo?

**En Windows:**
- Abre un editor de texto (Notepad, VS Code, etc.)
- Guarda el archivo como `.env` (sin nombre antes del punto)
- Si Windows no te deja, guárdalo como `env.txt` y luego renómbralo a `.env`

**O usando PowerShell:**
```powershell
cd server
echo "JWT_SECRET=A31uh0Tj4Xan9OIxHpp0XKjDSHFRehe0" > .env
echo "PORT=3001" >> .env
```

⚠️ **IMPORTANTE**: Este archivo `.env` NO debe subirse a GitHub (ya está en .gitignore)

---

## ✅ Verificación

### En Render:
- Ve a "Environment" → Debe aparecer `JWT_SECRET` con tu valor
- El servicio debe estar funcionando (verde)

### Localmente:
- El archivo `server/.env` debe existir
- Debe contener `JWT_SECRET=A31uh0Tj4Xan9OIxHpp0XKjDSHFRehe0`

---

## 🔒 Seguridad

✅ **SÍ hacer:**
- Guardar en variables de entorno de Render
- Guardar en `.env` local (que NO se sube a GitHub)
- Usar el mismo secreto en producción y desarrollo

❌ **NO hacer:**
- Subir el secreto a GitHub
- Compartir el secreto públicamente
- Hardcodear el secreto en el código

---

## 🎯 Resumen Rápido

1. **Render (IMPORTANTE)**: Environment → Add Variable → `JWT_SECRET` = `A31uh0Tj4Xan9OIxHpp0XKjDSHFRehe0`
2. **Local (Opcional)**: Crear `server/.env` con `JWT_SECRET=A31uh0Tj4Xan9OIxHpp0XKjDSHFRehe0`

¡Ya está! Tu aplicación debería funcionar correctamente. 🚀

