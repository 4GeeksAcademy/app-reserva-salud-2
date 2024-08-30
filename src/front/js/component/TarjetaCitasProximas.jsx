import React from 'react'


export const TarjetaProximaCita = ({citas}) => {
  return (
    <div className="d-flex justify-content-center">
    <div className='card bg-secondary text-white w-75'>
      <div className="row align-items-center justify-content-center p-3">
        <div className="col-5 text-center">
          <img src={citas.fotoprofesional} className='img-fluid' height={100} width={100} alt="" />
          <h2 className='text-subtitle text-truncate'>{citas.profesional}</h2>
        </div>
        <div className="col-7">
          <h2 className='text-label'>Día: {citas.dia}</h2>
          <p className='text-label text-white'>Hora: {citas.hora}</p>
          <h2 className='text-label'>Modalidad:</h2>
          <div className="col">
              <span className="badge rounded-pill py-2 bg-primary">{citas.modalidad}</span>
            </div>
        </div>
      </div>
    </div>
    </div>
  )
}
