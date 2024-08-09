import React from 'react'

export const ProfesionalCard = ({ profesional }) => {
  return (
    <div className="card shadow-md m-2">
      <div className="row">
        <div className="col-md-4">
          <img src={profesional?.foto_perfil} className="img-fluid rounded-start" style={{ height: "100%", objectFit: "cover" }} alt="..." />
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <h5 className="card-title">{profesional?.usuario.nombre} {profesional?.usuario.apellido}</h5>
            <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
            <p className="card-text"><small className="text-body-secondary">Last updated 3 mins ago</small></p>
          </div>
        </div>
      </div>
    </div>
  )
}
