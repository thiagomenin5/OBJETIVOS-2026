# 🗄️ Migrar de SQLite a PostgreSQL - Guía Completa

## ✅ Problema Resuelto

PostgreSQL mantiene los datos de forma permanente, incluso en el plan gratuito de Render. Tus objetivos ya NO se borrarán.

---

## 📝 Paso 1: Crear Base de Datos PostgreSQL en Render

1. Ve a Render Dashboard: https://dashboard.render.com
2. Click en **"New +"** → **"PostgreSQL"**
3. Configuración:
   - **Name**: `objetivo-2026-db`
   - **Database**: (déjalo por defecto)
   - **User**: (se crea automáticamente)
   - **Region**: La misma que tu backend (Oregon)
   - **Plan**: **Free**
4. Click en **"Create Database"**
5. Espera 1-2 minutos

---

## 📝 Paso 2: Obtener Connection String

1. En tu base de datos PostgreSQL, ve a **"Connections"**
2. Busca **"Internal Database URL"**
3. Copia la URL completa (algo como: `postgresql://user:password@host:5432/database`)
4. **¡Guárdala!** La necesitarás en el siguiente paso

---

## 📝 Paso 3: Agregar Variable de Entorno en el Backend

1. Ve a tu servicio backend: **OBJETIVOS-2026**
2. Click en **"Settings"** → **"Environment"**
3. Click en **"Add Environment Variable"**
4. Configura:
   - **Key**: `DATABASE_URL`
   - **Value**: (pega la Internal Database URL que copiaste)
5. Click en **"Save Changes"**

---

## 📝 Paso 4: Actualizar el Código

Ya está creado el archivo `server/index.postgresql.js` con el código migrado.

**Ahora necesitas:**

1. **Respaldar el archivo actual** (por si acaso):
   ```bash
   cp server/index.js server/index.sqlite.backup.js
   ```

2. **Reemplazar el archivo**:
   - Reemplaza `server/index.js` con el contenido de `server/index.postgresql.js`
   - O renombra: `server/index.postgresql.js` → `server/index.js`

3. **Actualizar package.json** (ya está hecho, pero verifica):
   - Debe tener `"pg": "^8.11.3"` en dependencies
   - Ya no necesita `"sqlite3"`

---

## 📝 Paso 5: Subir Cambios a GitHub

```bash
cd "C:\Users\tatim\Desktop\OBJETIVO 2026"
git add .
git commit -m "Migrar de SQLite a PostgreSQL"
git push
```

Render detectará los cambios y:
1. Instalará el paquete `pg`
2. Reconstruirá el servidor
3. Conectará a PostgreSQL

---

## ✅ Verificación

Después del despliegue:

1. Abre tu aplicación
2. Crea una cuenta (o inicia sesión si ya tienes)
3. Crea algunos objetivos
4. Recarga la página
5. **Los objetivos deben seguir ahí** ✅

---

## 🔄 Diferencias Principales SQLite → PostgreSQL

- ✅ `sqlite3.Database()` → `pg.Pool()`
- ✅ `db.run()` → `pool.query()`
- ✅ `db.get()` → `pool.query()` (primera fila)
- ✅ `db.all()` → `pool.query()` (todas las filas)
- ✅ `AUTOINCREMENT` → `SERIAL`
- ✅ `INTEGER` (booleano) → `BOOLEAN`
- ✅ `?` (placeholders) → `$1, $2, $3`
- ✅ `this.lastID` → `RETURNING id`

---

## 🆘 Troubleshooting

### Error: "Cannot find module 'pg'"
- Verifica que `package.json` tenga `"pg": "^8.11.3"`
- Sube los cambios a GitHub
- Render debe reinstalar dependencias

### Error de conexión a la base de datos
- Verifica que `DATABASE_URL` esté configurada correctamente
- Usa la "Internal Database URL" (no la External)
- Asegúrate de que la base de datos esté en la misma región

### Los datos no aparecen
- La base de datos está vacía (normal la primera vez)
- Crea nuevos objetivos, deberían persistir
- Los datos anteriores en SQLite no se migran automáticamente

---

## 🎯 Resumen

1. ✅ Crear PostgreSQL en Render (Free)
2. ✅ Copiar Internal Database URL
3. ✅ Agregar `DATABASE_URL` en variables de entorno del backend
4. ✅ Reemplazar `server/index.js` con código PostgreSQL
5. ✅ `git push` para desplegar
6. ✅ ¡Listo! Los datos ahora persisten

**Tus objetivos ya NO se borrarán.** 🎉

