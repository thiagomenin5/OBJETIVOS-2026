import React, { useState, useEffect } from 'react'
import { objetivosService } from '../services/authService'
import ObjetivoCard from './ObjetivoCard'
import ObjetivoForm from './ObjetivoForm'
import ObjetivoPrincipal from './ObjetivoPrincipal'
import './Dashboard.css'

const Dashboard = ({ user, onLogout }) => {
  const [objetivos, setObjetivos] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingObjetivo, setEditingObjetivo] = useState(null)

  useEffect(() => {
    loadObjetivos()
  }, [])

  const loadObjetivos = async () => {
    try {
      const data = await objetivosService.getAll()
      setObjetivos(data)
    } catch (error) {
      console.error('Error al cargar objetivos:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleCreate = async (titulo, descripcion) => {
    try {
      await objetivosService.create(titulo, descripcion)
      await loadObjetivos()
      setShowForm(false)
    } catch (error) {
      console.error('Error al crear objetivo:', error)
      throw error
    }
  }

  const handleUpdate = async (id, titulo, descripcion) => {
    try {
      await objetivosService.update(id, titulo, descripcion)
      await loadObjetivos()
      setEditingObjetivo(null)
      setShowForm(false) // Cerrar el formulario después de actualizar
    } catch (error) {
      console.error('Error al actualizar objetivo:', error)
      throw error
    }
  }

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este objetivo?')) {
      try {
        await objetivosService.delete(id)
        await loadObjetivos()
      } catch (error) {
        console.error('Error al eliminar objetivo:', error)
        alert('Error al eliminar el objetivo')
      }
    }
  }

  const handleSetPrincipal = async (id) => {
    try {
      await objetivosService.setPrincipal(id)
      await loadObjetivos()
    } catch (error) {
      console.error('Error al marcar como principal:', error)
      alert('Error al marcar objetivo como principal')
    }
  }

  const handleSetCompletado = async (id, completado) => {
    try {
      await objetivosService.setCompletado(id, completado)
      await loadObjetivos()
    } catch (error) {
      console.error('Error al actualizar estado:', error)
      alert('Error al actualizar el estado del objetivo')
    }
  }

  const handleEdit = (objetivo) => {
    setEditingObjetivo(objetivo)
    setShowForm(true)
  }

  const handleCancel = () => {
    setShowForm(false)
    setEditingObjetivo(null)
  }

  // Separar objetivos
  const objetivoPrincipal = objetivos.find(obj => obj.es_principal && !obj.completado)
  const objetivosActivos = objetivos.filter(obj => !obj.completado && obj.id !== objetivoPrincipal?.id)
  const objetivosCompletados = objetivos.filter(obj => obj.completado)

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Cargando tus objetivos...</p>
      </div>
    )
  }

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div className="header-content">
          <div>
            <h1>🎯 Mis Objetivos 2026</h1>
            <p className="welcome-text">¡Hola {user.username}! Mantén el foco y alcanza tus metas</p>
          </div>
          <button onClick={onLogout} className="btn-logout">
            Cerrar Sesión
          </button>
        </div>
      </header>

      <main className="dashboard-main">
        {!showForm && (
          <button
            onClick={() => setShowForm(true)}
            className="btn-add-objetivo"
          >
            + Nuevo Objetivo
          </button>
        )}

        {showForm && (
          <ObjetivoForm
            objetivo={editingObjetivo}
            onSubmit={editingObjetivo ? handleUpdate : handleCreate}
            onCancel={handleCancel}
          />
        )}

        {objetivos.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">🎯</div>
            <h2>No tienes objetivos aún</h2>
            <p>Comienza agregando tu primer objetivo para 2026</p>
            {!showForm && (
              <button
                onClick={() => setShowForm(true)}
                className="btn-primary"
              >
                Crear Primer Objetivo
              </button>
            )}
          </div>
        ) : (
          <>
            {/* Objetivo Principal */}
            {objetivoPrincipal && (
              <ObjetivoPrincipal
                objetivo={objetivoPrincipal}
                onEdit={handleEdit}
                onCompletar={(id) => handleSetCompletado(id, true)}
              />
            )}

            {/* Objetivos Activos (excluyendo el principal) */}
            {objetivosActivos.length > 0 && (
              <section className="seccion-objetivos">
                <h2 className="seccion-titulo">
                  {objetivoPrincipal ? 'Otros Objetivos' : 'Mis Objetivos'}
                </h2>
                <div className="objetivos-grid">
                  {objetivosActivos.map((objetivo) => (
                    <ObjetivoCard
                      key={objetivo.id}
                      objetivo={objetivo}
                      onEdit={handleEdit}
                      onDelete={handleDelete}
                      onSetPrincipal={handleSetPrincipal}
                      onSetCompletado={handleSetCompletado}
                    />
                  ))}
                </div>
              </section>
            )}

            {/* Objetivos Cumplidos */}
            {objetivosCompletados.length > 0 && (
              <section className="seccion-objetivos seccion-completados">
                <h2 className="seccion-titulo">✅ Objetivos Cumplidos ({objetivosCompletados.length})</h2>
                <div className="objetivos-grid">
                  {objetivosCompletados.map((objetivo) => (
                    <ObjetivoCard
                      key={objetivo.id}
                      objetivo={objetivo}
                      onEdit={handleEdit}
                      onDelete={handleDelete}
                      onSetCompletado={handleSetCompletado}
                    />
                  ))}
                </div>
              </section>
            )}
          </>
        )}
      </main>
    </div>
  )
}

export default Dashboard

