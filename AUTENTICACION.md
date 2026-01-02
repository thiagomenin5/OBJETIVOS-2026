# 🔐 Sistema de Autenticación - Objetivos 2026

## Resumen

El sistema de autenticación está completo y funcional. Permite a los usuarios registrarse e iniciar sesión de forma segura.

## Características Implementadas

### ✅ Registro de Usuarios

- **Endpoint**: `POST /api/register`
- **Validaciones**:
  - Usuario requerido (3-20 caracteres)
  - Solo letras, números, guiones y guiones bajos
  - Contraseña requerida (mínimo 6 caracteres, máximo 100)
  - No permite usuarios duplicados
- **Seguridad**:
  - Contraseñas encriptadas con bcrypt (10 rounds)
  - Token JWT generado automáticamente al registrarse
  - Token válido por 30 días

### ✅ Inicio de Sesión

- **Endpoint**: `POST /api/login`
- **Validaciones**:
  - Usuario y contraseña requeridos
  - Verificación segura de contraseña (bcrypt)
- **Seguridad**:
  - Mensaje genérico de error para evitar enumeración de usuarios
  - Token JWT generado al iniciar sesión
  - Token válido por 30 días

### ✅ Verificación de Token

- **Endpoint**: `GET /api/verify`
- **Protección**: Requiere token JWT válido
- **Uso**: Verifica si el usuario está autenticado y obtiene sus datos

## Frontend

### Componente Login

- **Modo dual**: Mismo formulario para registro e inicio de sesión
- **Validaciones del lado del cliente**:
  - Validación de formato de usuario en tiempo real
  - Validación de longitud de contraseña
  - Mensajes de error claros y específicos
- **UX mejorada**:
  - Limpia errores al escribir en los campos
  - Indicador de carga durante las peticiones
  - Placeholder dinámico según el modo (registro/login)
  - Hint visual para contraseña en modo registro

### Flujo de Autenticación

1. Usuario ingresa credenciales
2. Validación del lado del cliente
3. Petición al backend (registro o login)
4. Backend valida y procesa
5. Token JWT almacenado en localStorage
6. Redirección automática al Dashboard
7. Token verificado en cada recarga de página

## Seguridad

- ✅ Contraseñas encriptadas (bcrypt)
- ✅ Tokens JWT con expiración (30 días)
- ✅ Validación tanto en frontend como backend
- ✅ Sanitización de inputs (trim, validación de formato)
- ✅ Manejo seguro de errores
- ✅ Prevención de enumeración de usuarios

## Cómo Probar

### 1. Iniciar el servidor

```bash
npm run dev
```

Esto iniciará:
- Backend en: `http://localhost:3001`
- Frontend en: `http://localhost:3000`

### 2. Probar Registro

1. Abre `http://localhost:3000`
2. Haz clic en "¿No tienes cuenta? Regístrate"
3. Ingresa:
   - Usuario: `testuser` (3-20 caracteres, sin espacios)
   - Contraseña: `password123` (mínimo 6 caracteres)
4. Haz clic en "Registrarse"
5. Deberías ser redirigido automáticamente al Dashboard

### 3. Probar Inicio de Sesión

1. Si ya tienes una cuenta, ingresa tus credenciales
2. Haz clic en "Iniciar Sesión"
3. Deberías ser redirigido al Dashboard

### 4. Probar Validaciones

**Registro con usuario inválido:**
- Usuario con espacios → Error: formato inválido
- Usuario muy corto (< 3 caracteres) → Error del navegador
- Usuario muy largo (> 20 caracteres) → Error del navegador
- Contraseña corta (< 6 caracteres) → Error: mínimo 6 caracteres

**Inicio de sesión con credenciales incorrectas:**
- Usuario inexistente → Error: "Usuario o contraseña incorrectos"
- Contraseña incorrecta → Error: "Usuario o contraseña incorrectos"

## Estructura de Datos

### Tabla `users`

```sql
CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
)
```

### Token JWT

Contiene:
```json
{
  "id": 1,
  "username": "testuser",
  "iat": 1234567890,
  "exp": 1234567890
}
```

## Próximos Pasos

Una vez que el sistema de autenticación esté probado, podemos:
1. ✅ Continuar con la gestión de objetivos (CRUD)
2. Agregar funcionalidades adicionales (recuperación de contraseña, etc.)
3. Mejorar el diseño según feedback

---

**Estado**: ✅ Completo y listo para probar

