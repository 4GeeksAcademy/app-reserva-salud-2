import React from 'react'
import { useNavigate } from 'react-router-dom';

export const departamentos = {
  ARTIGAS: "Artigas",
  CANELONES: "Canelones",
  CERRO_LARGO: "Cerro Largo",
  COLONIA: "Colonia",
  DURAZNO: "Durazno",
  FLORES: "Flores",
  FLORIDA: "Florida",
  LAVALLEJA: "Lavalleja",
  MALDONADO: "Maldonado",
  MONTEVIDEO: "Montevideo",
  PAYSANDU: "Paysandú",
  RIO_NEGRO: "Río Negro",
  RIVERA: "Rivera",
  ROCHA: "Rocha",
  SALTO: "Salto",
  SAN_JOSE: "San José",
  SORIANO: "Soriano",
  TACUAREMBO: "Tacuarembó",
  TREINTA_Y_TRES: "Treinta y Tres"
}

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

  return (

    <div className='card bg-primary text-white' onClick={() => navigate(`${profesional.id}`)} style={{ cursor: "pointer" }}>
      <div className="row align-items-center justify-content-center p-3">
        <div className="col-5 text-center">
          <img src={profesional.profile_picture} className='img-fluid rounded-circle' height={100} width={100} alt="" />
          <h2 className='text-subtitle text-truncate'>{profesional?.first_name} {profesional?.last_name}</h2>
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
        <div className="col-7">
          <h2 className='text-label'>Título:</h2>
          <p className='text-body text-white'>{profesional?.title}</p>
          <h2 className='text-label'>Ubicación:</h2>
          <p className='text-body text-white'><i className="fa-solid fa-location-dot"></i> {departamentos[profesional?.state?.toUpperCase()]}</p>
        </div>
      </div>
    </div>

  )
}
