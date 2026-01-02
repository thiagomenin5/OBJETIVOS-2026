# ✅ Pasos Rápidos: Configurar PostgreSQL en Render

## 🎯 Estás en el Formulario - Completa Así:

### Formulario "New Postgres":

1. **Name**: 
   ```
   objetivo-2026-db
   ```

2. **Project**: 
   - Déjalo vacío (puedes ignorar esta sección)

3. **Database**: 
   - Déjalo vacío

4. **User**: 
   - Déjalo vacío

5. **Region**: 
   - ✅ **Oregon (US West)** (debe estar seleccionado)

6. **PostgreSQL Version**: 
   - ✅ **18** (déjalo así)

7. **Datadog**: 
   - Déjalo todo vacío

### Plan Options:

1. **Instance Type**: 
   - ✅ **Free** (ya está seleccionado)
   - $0/mes

2. **Storage**: 
   - ✅ **1 GB** (déjalo así)
   - $0/mes

3. **Storage Autoscaling**: 
   - ✅ **Disabled**

4. **High Availability**: 
   - ✅ **Disabled**

5. **Monthly Total**: 
   - Debe decir: **$0/month**

### Crear:

6. ✅ Click en **"Create Database"** (botón abajo a la izquierda)

---

## 🔑 Después de Crear:

### Paso 1: Obtener Connection String

1. Render te mostrará la página de tu base de datos
2. Click en **"Connections"** (en el menú lateral)
3. Busca **"Internal Database URL"**
4. **¡COPIA esa URL!** (algo como: `postgresql://user:pass@host:5432/db`)

### Paso 2: Agregar al Backend

1. Ve a tu servicio backend: **OBJETIVOS-2026**
2. Click en **"Environment"**
3. Click en **"Add Environment Variable"**
4. **Key**: `DATABASE_URL`
5. **Value**: (Pega la URL que copiaste)
6. Click en **"Save Changes"**

### Paso 3: Subir Código

```bash
git add .
git commit -m "Configurar PostgreSQL"
git push
```

Render desplegará automáticamente.

---

## ✅ Listo!

Después de estos pasos, tus objetivos persistirán permanentemente. 🎉

