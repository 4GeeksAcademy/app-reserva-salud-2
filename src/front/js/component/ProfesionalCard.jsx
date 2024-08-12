import React from 'react'
import { useNavigate } from 'react-router-dom';

export const ProfesionalCard = ({ profesional }) => {
  const navigate = useNavigate();

  const renderStars = () => {
    const filledStars = Math.floor(profesional?.calificacion);
    const emptyStars = 5 - filledStars;

    const stars = [];

    for (let i = 0; i < filledStars; i++) {
      stars.push(<i key={i} className="fa-solid fa-star"></i>);
    }

    for (let i = 0; i < emptyStars; i++) {
      stars.push(<i key={filledStars + i} className="fa-regular fa-star"></i>);
    }

    return stars;
  }

  const departamentos = {
    artigas: "Artigas",
    canelones: "Canelones",
    "cerro-largo": "Cerro Largo",
    colonia: "Colonia",
    durazno: "Durazno",
    flores: "Flores",
    florida: "Florida",
    lavalleja: "Lavalleja",
    maldonado: "Maldonado",
    montevideo: "Montevideo",
    paysandu: "Paysandú",
    "rio-negro": "Río Negro",
    rivera: "Rivera",
    rocha: "Rocha",
    salto: "Salto",
    "san-jose": "San José",
    soriano: "Soriano",
    tacuarembo: "Tacuarembó",
    "treinta-y-tres": "Treinta y Tres"
  }


  return (

    <div className='card bg-primary text-white' onClick={() => navigate(`${profesional.id}`)} style={{ cursor: "pointer" }}>
      <div className="row align-items-center justify-content-center p-3">
        <div className="col-5 col-md-4 mx-auto text-center">
          <img src={profesional.foto_perfil} className='img-fluid rounded-circle' alt="" />
          <h2 className='text-subtitle text-truncate'>{profesional?.usuario.nombre} {profesional?.usuario.apellido}</h2>
          <div className="row gap-2">
            <div className="col">
              <span className="badge rounded-pill py-2 text-bg-primary">Online</span>
            </div>
            <div className="col">
              <span className="badge rounded-pill py-2 text-bg-success">Presencial</span>
            </div>
          </div>
          <p>{renderStars()}</p>
        </div>
        <div className="col-7 col-md-8">
          <h2 className='text-label'>Especialidad:</h2>
          <p className='text-body text-white'>{profesional?.titulo_habilitante}</p>
          <h2 className='text-label'>Matrícula:</h2>
          <p className='text-body text-white'>{profesional?.matricula}</p>
          <h2 className='text-label'>Ubicación:</h2>
          <p className='text-body text-white'><i className="fa-solid fa-location-dot"></i> {departamentos[profesional?.departamento]}</p>
        </div>
      </div>
    </div>

  )
}
