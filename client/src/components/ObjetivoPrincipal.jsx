import React from 'react'
import './ObjetivoPrincipal.css'

const ObjetivoPrincipal = ({ objetivo, onEdit, onCompletar }) => {
  return (
    <div className="objetivo-principal">
      <div className="principal-badge">⭐ OBJETIVO PRINCIPAL</div>
      <div className="principal-content">
        <h2 className="principal-titulo">{objetivo.titulo}</h2>
        {objetivo.descripcion && (
          <p className="principal-descripcion">{objetivo.descripcion}</p>
        )}
        <div className="principal-actions">
          <button
            onClick={() => onCompletar(objetivo.id)}
            className="btn-completar"
          >
            ✅ Marcar como Cumplido
          </button>
          <button
            onClick={() => onEdit(objetivo)}
            className="btn-editar-principal"
          >
            ✏️ Editar
          </button>
        </div>
      </div>
    </div>
  )
}

export default ObjetivoPrincipal

