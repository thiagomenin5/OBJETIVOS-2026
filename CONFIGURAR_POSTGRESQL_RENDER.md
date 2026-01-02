# 🗄️ Configurar PostgreSQL en Render - Paso a Paso

## 📝 Paso 1: Crear Base de Datos PostgreSQL

Veo que ya estás en el formulario de crear PostgreSQL. Configura así:

### Campos a Completar:

1. **Name**: 
   - Escribe: `objetivo-2026-db` (o el nombre que prefieras)
   - Este es el nombre que verás en Render

2. **Project (Opcional)**: 
   - Déjalo vacío (puedes crear un proyecto después si quieres)

3. **Database (Opcional)**: 
   - Déjalo vacío (Render generará uno automáticamente)

4. **User (Opcional)**: 
   - Déjalo vacío (Render generará uno automáticamente)

5. **Region**: 
   - ✅ **Selecciona: "Oregon (US West)"** (debe estar ya seleccionado)
   - Es importante que sea la misma región que tu backend

6. **PostgreSQL Version**: 
   - ✅ Déjalo en "18" (la versión más reciente está bien)

7. **Datadog API Key (Opcional)**: 
   - Déjalo vacío (no es necesario)

8. **Datadog Region (Opcional)**: 
   - Déjalo vacío (no es necesario)

### Plan Options:

1. **Instance Type**: 
   - ✅ Selecciona **"Free"** (el que está marcado)
   - $0/mes, 256 MB RAM, 0.1 CPU, 1 GB Storage

2. **Storage**: 
   - ✅ Déjalo en **"1 GB"** (suficiente para empezar)
   - $0/mes

3. **Storage Autoscaling**: 
   - ✅ Déjalo en **"Disabled"** (puedes habilitarlo después si lo necesitas)

4. **High Availability**: 
   - ✅ Déjalo en **"Disabled"** (solo para planes de pago)

5. **Monthly Total**: 
   - Debe mostrar: **$0/month** ✅

### Finalizar:

6. Click en **"Create Database"** (botón abajo a la izquierda)

7. **Espera 1-2 minutos** mientras Render crea la base de datos

---

## 📝 Paso 2: Obtener Connection String

Después de que se cree la base de datos:

1. Render te mostrará la página de la base de datos
2. En el menú lateral, click en **"Connections"**
3. Busca la sección **"Internal Database URL"**
4. **¡COPIA esa URL completa!**
   - Se ve algo como: `postgresql://usuario:contraseña@host:5432/database`
   - **Guárdala bien**, la necesitarás en el siguiente paso

---

## 📝 Paso 3: Agregar Variable de Entorno en el Backend

1. Ve a tu Dashboard de Render
2. Click en tu servicio backend: **OBJETIVOS-2026**
3. En el menú lateral, click en **"Environment"**
4. En la sección "Environment Variables", click en **"Add Environment Variable"**
5. Configura:
   - **Key**: `DATABASE_URL`
   - **Value**: (Pega la Internal Database URL que copiaste en el Paso 2)
6. Click en **"Save Changes"**

---

## 📝 Paso 4: Subir Código a GitHub

El código ya está actualizado para usar PostgreSQL. Solo necesitas subirlo:

```bash
cd "C:\Users\tatim\Desktop\OBJETIVO 2026"
git add .
git commit -m "Migrar a PostgreSQL para persistencia de datos"
git push
```

Render detectará los cambios automáticamente y desplegará.

---

## ✅ Verificación

Después de que Render termine de desplegar:

1. Abre tu aplicación en producción
2. Crea una cuenta o inicia sesión
3. Crea algunos objetivos
4. Recarga la página
5. **Los objetivos deben seguir ahí** ✅

---

## 🎯 Resumen de Configuración

```
PostgreSQL:
  Name: objetivo-2026-db
  Region: Oregon (US West)
  Plan: Free
  Storage: 1 GB

Backend:
  Variable de Entorno:
    Key: DATABASE_URL
    Value: (Internal Database URL de PostgreSQL)
```

---

## ⚠️ Importante

- ✅ Usa la **"Internal Database URL"** (no la External)
- ✅ La región debe ser la misma que tu backend (Oregon)
- ✅ El plan Free es suficiente para empezar
- ✅ Los datos ahora persistirán permanentemente

¡Sigue estos pasos y tus objetivos ya no se borrarán! 🎉

