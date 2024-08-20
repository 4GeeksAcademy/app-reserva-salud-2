import React from 'react'
import { Link } from 'react-router-dom'

export const TarjetaCitasProfesional = ({citas}) => {
  return (
    <div className="d-flex justify-content-center">
    <div className='card bg-secondary text-white w-75 m-3'>
      <div className="row align-items-center justify-content-center p-3">
        <div className="col-md-4 col-sm-12 text-center">
          <img src={citas.fotoprofesional} className='img-fluid' height={100} width={100} alt="" />
          <h2 className='text-subtitle text-truncate'>{citas.profesional}</h2>
        </div>
        <div className="col-md-4 col-sm-12 text-center">
          <h2 className='text-label'>Día: {citas.dia}</h2>
          <p className='text-label text-white'>Hora: {citas.hora}</p>
          <h2 className='text-label'>Modalidad:</h2>
          <div className="col">
              <span className="badge rounded-pill py-2 bg-primary">{citas.modalidad}</span>
            </div>
        </div>
        <div className="col-md-4 col-sm-12 d-flex flex-column justify-content-center align-items-center">
        <button className='btn bg-primary w-75 text-white text-normal text-center m-1'>Reprogramar </button>
        <button className='btn bg-primary w-75 text-white text-normal text-center m-1'>Cancelar</button>
        <Link to={"/datos-paciente"} className="btn bg-primary w-75 text-white text-normal text-center m-1">
         Datos del paciente
          </Link>
        </div>
      </div>
    </div>
    </div>
  )
}