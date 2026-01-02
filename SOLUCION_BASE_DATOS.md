# 🔧 Solución: Objetivos que se Borran

## ❌ Problema

Los objetivos se borran cuando recargas la página o después de un tiempo.

## 🔍 Causa

En el **plan gratuito de Render**, la base de datos SQLite puede perderse porque:
- Los archivos en el sistema de archivos efímero se borran cuando el servicio se recrea
- Render puede recrear el contenedor periódicamente
- SQLite guarda los datos en un archivo que puede desaparecer

## ✅ Solución: Usar PostgreSQL (Gratis)

PostgreSQL es una base de datos más robusta que Render mantiene de forma persistente, incluso en el plan gratuito.

---

## 🎯 Opción 1: Migrar a PostgreSQL (Recomendado)

### Paso 1: Crear Base de Datos PostgreSQL en Render

1. Ve a Render Dashboard: https://dashboard.render.com
2. Click en **"New +"** → **"PostgreSQL"**
3. Configuración:
   - **Name**: `objetivo-2026-db` (o el nombre que prefieras)
   - **Database**: `objetivos_db` (o deja el default)
   - **User**: (se crea automáticamente)
   - **Region**: La misma que tu backend
   - **Plan**: **Free**
4. Click en **"Create Database"**
5. **Espera** 1-2 minutos

### Paso 2: Obtener la Connection String

1. En tu base de datos PostgreSQL, ve a **"Connections"**
2. Copia la **"Internal Database URL"** (algo como: `postgresql://user:password@host:5432/database`)
3. **Guárdala**, la necesitarás

### Paso 3: Agregar Variable de Entorno

1. Ve a tu servicio backend (OBJETIVOS-2026)
2. **Settings** → **Environment**
3. Agrega variable:
   - **Key**: `DATABASE_URL`
   - **Value**: (pega la Internal Database URL que copiaste)
4. Guarda

### Paso 4: Actualizar Código del Backend

Necesitamos cambiar de SQLite a PostgreSQL. Te ayudo a crear el código actualizado.

---

## 🎯 Opción 2: Solución Temporal con SQLite (No recomendado)

Si no quieres cambiar a PostgreSQL ahora, puedes intentar:

1. Verificar que el archivo de base de datos no esté en `.gitignore` incorrectamente
2. Los datos se perderán periódicamente en plan gratuito

**Recomendación: Usa PostgreSQL para una solución permanente.**

---

## 📋 ¿Qué Necesitas para PostgreSQL?

1. ✅ Instalar `pg` (cliente de PostgreSQL para Node.js)
2. ✅ Cambiar el código de SQLite a PostgreSQL
3. ✅ Actualizar las queries SQL (ligeras diferencias de sintaxis)

**¿Quieres que te ayude a migrar a PostgreSQL?** Es la mejor solución y es gratis. 🚀

