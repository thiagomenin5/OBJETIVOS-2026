import React, { useState, useEffect } from 'react'
import './ObjetivoForm.css'

const ObjetivoForm = ({ objetivo, onSubmit, onCancel }) => {
  const [titulo, setTitulo] = useState('')
  const [descripcion, setDescripcion] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (objetivo) {
      setTitulo(objetivo.titulo || '')
      setDescripcion(objetivo.descripcion || '')
    }
  }, [objetivo])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!titulo.trim()) {
      setError('El título es requerido')
      return
    }

    setLoading(true)
    try {
      if (objetivo) {
        await onSubmit(objetivo.id, titulo.trim(), descripcion.trim())
      } else {
        await onSubmit(titulo.trim(), descripcion.trim())
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Error al guardar el objetivo')
      setLoading(false)
    }
  }

  return (
    <div className="objetivo-form-container">
      <form className="objetivo-form" onSubmit={handleSubmit}>
        <h2>{objetivo ? 'Editar Objetivo' : 'Nuevo Objetivo'}</h2>

        {error && <div className="error-message">{error}</div>}

        <div className="form-group">
          <label htmlFor="titulo">Título del Objetivo *</label>
          <input
            type="text"
            id="titulo"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            placeholder="Ej: Aprender React y Node.js"
            required
            maxLength={200}
          />
        </div>

        <div className="form-group">
          <label htmlFor="descripcion">Descripción</label>
          <textarea
            id="descripcion"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            placeholder="Describe los detalles de tu objetivo, pasos a seguir, motivación..."
            rows="5"
            maxLength={1000}
          />
        </div>

        <div className="form-actions">
          <button
            type="button"
            onClick={onCancel}
            className="btn-cancel"
            disabled={loading}
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="btn-submit"
            disabled={loading}
          >
            {loading ? 'Guardando...' : objetivo ? 'Actualizar' : 'Crear Objetivo'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default ObjetivoForm

