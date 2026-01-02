import React from 'react'
import './ObjetivoCard.css'

const ObjetivoCard = ({ objetivo, onEdit, onDelete, onSetPrincipal, onSetCompletado }) => {
  return (
    <div className={`objetivo-card ${objetivo.completado ? 'completado' : ''}`}>
      <div className="card-header">
        <h2 className="card-titulo">{objetivo.titulo}</h2>
        <div className="card-actions">
          {!objetivo.completado && onSetPrincipal && (
            <button
              onClick={() => onSetPrincipal(objetivo.id)}
              className={`btn-icon btn-principal ${objetivo.es_principal ? 'active' : ''}`}
              title={objetivo.es_principal ? "Ya es objetivo principal" : "Marcar como principal"}
            >
              {objetivo.es_principal ? '⭐' : '⭐'}
            </button>
          )}
          {!objetivo.completado && onSetCompletado && (
            <button
              onClick={() => onSetCompletado(objetivo.id, true)}
              className="btn-icon btn-completar"
              title="Marcar como cumplido"
            >
              ✅
            </button>
          )}
          <button
            onClick={() => onEdit(objetivo)}
            className="btn-icon btn-edit"
            title="Editar"
          >
            ✏️
          </button>
          <button
            onClick={() => onDelete(objetivo.id)}
            className="btn-icon btn-delete"
            title="Eliminar"
          >
            🗑️
          </button>
        </div>
      </div>
      
      {objetivo.descripcion && (
        <p className="card-descripcion">{objetivo.descripcion}</p>
      )}

      <div className="card-footer">
        {objetivo.completado && (
          <span className="card-completado-badge">✓ Cumplido</span>
        )}
        {objetivo.es_principal && !objetivo.completado && (
          <span className="card-principal-badge">⭐ Principal</span>
        )}
        <span className="card-date">
          Creado: {new Date(objetivo.created_at).toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
        </span>
      </div>
    </div>
  )
}

export default ObjetivoCard

