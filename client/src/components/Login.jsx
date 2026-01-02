import React, { useState } from 'react'
import { authService } from '../services/authService'
import './Login.css'

const Login = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    
    // Validaciones del lado del cliente
    if (!username.trim()) {
      setError('Por favor ingresa un usuario')
      return
    }
    
    if (!password) {
      setError('Por favor ingresa una contraseña')
      return
    }

    if (!isLogin && password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres')
      return
    }

    setLoading(true)

    try {
      const data = isLogin
        ? await authService.login(username.trim(), password)
        : await authService.register(username.trim(), password)

      onLogin(data.user, data.token)
    } catch (err) {
      const errorMessage = err.response?.data?.error || err.message || 'Error al procesar la solicitud'
      setError(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h1>🎯 Objetivos 2026</h1>
          <p>Tu motivación diaria para alcanzar tus metas</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          {error && <div className="error-message">{error}</div>}

          <div className="form-group">
            <label htmlFor="username">Usuario</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value)
                setError('') // Limpiar error al escribir
              }}
              required
              placeholder="Ingresa tu usuario (3-20 caracteres)"
              minLength="3"
              maxLength="20"
              pattern="[a-zA-Z0-9_-]+"
              title="Solo letras, números, guiones y guiones bajos"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value)
                setError('') // Limpiar error al escribir
              }}
              required
              placeholder={isLogin ? "Ingresa tu contraseña" : "Mínimo 6 caracteres"}
              minLength="6"
              maxLength="100"
            />
            {!isLogin && (
              <small style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginTop: '4px' }}>
                Mínimo 6 caracteres
              </small>
            )}
          </div>

          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? 'Cargando...' : isLogin ? 'Iniciar Sesión' : 'Registrarse'}
          </button>
        </form>

        <div className="login-footer">
          <button
            type="button"
            className="btn-link"
            onClick={() => {
              setIsLogin(!isLogin)
              setError('')
            }}
          >
            {isLogin
              ? '¿No tienes cuenta? Regístrate'
              : '¿Ya tienes cuenta? Inicia sesión'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default Login

