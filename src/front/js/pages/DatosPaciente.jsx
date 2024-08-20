import React from 'react';
import { Link } from 'react-router-dom';

export const Paciente = () => {
  return (
    <div className="container contenido">
      <div className='card bg-gray text-black m-3'>
        <div className="row align-items-center justify-content-center p-3">
          <div className="col-md-4 col-sm-12 text-center">
            <img src="https://avatar.iran.liara.run/public/boy" className='img-fluid mb-3' height={100} width={100} alt="" />
          </div>
          <div className="col-md-8 col-sm-12">
            <h2 className='text-subtitle'>Nombre:</h2>
            <h2 className='text-label'>Edad:</h2>
            <p className='text-label'>Departamento:</p>
          </div>
          <form>
            <div className="mb-3">
              <label htmlFor="exampleFormControlTextarea1" className="form-label text-label">Motivo de consulta</label>
              <textarea className="form-control" id="exampleFormControlTextarea1" rows="2"></textarea>
            </div>
            <div className="mb-3">
              <label htmlFor="exampleFormControlTextarea1" className="form-label text-label">Observaciones</label>
              <textarea className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
            </div>
            <div className="d-flex justify-content-center m-4">
          <Link to={"/perfil-profesional"} className="btn text-normal text-white bg-primary">
            Guardar
          </Link>
        </div>
          </form>
        </div>
      </div>
    </div>
  )
}