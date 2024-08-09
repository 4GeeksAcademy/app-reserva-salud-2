import React from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import 'swiper/css';
import 'swiper/css/autoplay';
import { ProfesionalCard } from '../component/ProfesionalCard.jsx';

const profesionales = [
  {
    id: 1,
    usuario: {
      nombre: 'Juan',
      apellido: 'Pérez'
    },
    foto_perfil: 'https://via.placeholder.com/150',
    fecha_nacimiento: '1990-01-01',
    genero: 'masculino',
    pais_nacimiento: 'Uruguay',
    telefono: 94843304,
    matricula: 123456,
    cjpu: 32563456743255,
    titulo_habilitante: 'Licenciado en Fisioterapia',
  },
  {
    id: 2,
    usuario: {
      nombre: 'María',
      apellido: 'González',
    },
    foto_perfil: 'https://via.placeholder.com/150',
    fecha_nacimiento: '1995-06-12',
    genero: 'femenino',
    pais_nacimiento: 'Uruguay',
    telefono: 94853535,
    matricula: 123456,
    cjpu: 32563456743255,
    titulo_habilitante: 'Licenciado en Psicología',
  }
]

export const Profesionales = () => {
  return (
    <div className='container contenido'>
      <h2 className='text-primary text-title text-center'>Profesionales</h2>
      <div className="d-flex flex-column gap-4">
        <div>
          <h3 className='text-subtitle text-center'>Destacados</h3>
          <Swiper
            modules={[Autoplay]}
            spaceBetween={50}
            slidesPerView={1}
            onSlideChange={() => console.log('slide change')}
            onSwiper={(swiper) => console.log(swiper)}
            autoplay={{ delay: 2500, disableOnInteraction: false }}
            breakpoints={{
              320: {
                slidesPerView: 1,
                spaceBetween: 20
              },
              1024: {
                slidesPerView: 2,
                spaceBetween: 40
              },
            }}
          >
            {
              profesionales.map(profesional => (
                <SwiperSlide key={profesional.id}>
                  <ProfesionalCard profesional={profesional} />
                </SwiperSlide>
              ))
            }
          </Swiper>
        </div>

        <div>
          <h3 className='text-subtitle text-center'>Filtros</h3>
          <div className="d-flex justify-content-center gap-4">
            <div className='d-flex flex-column'>
              <label htmlFor="especialidad" className="form-label">Especialidad</label>
              <select className="form-select" id='especialidad' aria-label="Especialidad">
                <option defaultValue>Seleccionar especialidad</option>
                <option value="fisioterapeuta">Fisioterapeuta</option>
                <option value="psicologo">Psicólogo</option>
                <option value="nutricionista">Nutricionista</option>
                <option value="dermatologo">Dermatólogo</option>
                <option value="radiologo">Radiólogo</option>
                <option value="oculista">Oculista</option>
                <option value="kinesiologo">Kinesiólogo</option>
                <option value="odontologo">Odontólogo</option>
              </select>
            </div>

            <div className='d-flex flex-column'>
              <label htmlFor="departamento" className="form-label">Departamento</label>
              <select className="form-select" id='departamento' aria-label="Departamento">
                <option defaultValue>Seleccionar departamento</option>
                <option value="artigas">Artigas</option>
                <option value="canelones">Canelones</option>
                <option value="cerro-largo">Cerro Largo</option>
                <option value="colonia">Colonia</option>
                <option value="durazno">Durazno</option>
                <option value="flores">Flores</option>
                <option value="florida">Florida</option>
                <option value="lavalleja">Lavalleja</option>
                <option value="maldonado">Maldonado</option>
                <option value="montevideo">Montevideo</option>
                <option value="paysandu">Paysandú</option>
                <option value="rio-negro">Río Negro</option>
                <option value="rivera">Rivera</option>
                <option value="rocha">Rocha</option>
                <option value="salto">Salto</option>
                <option value="san-jose">San José</option>
                <option value="soriano">Soriano</option>
                <option value="tacuarembo">Tacuarembó</option>
                <option value="treinta-y-tres">Treinta y Tres</option>
              </select>
            </div>
          </div>
        </div>

        <div className='d-flex flex-column'>
          <ProfesionalCard />
          <ProfesionalCard />
          <ProfesionalCard />
          <ProfesionalCard />
          <ProfesionalCard />
          <ProfesionalCard />
          <ProfesionalCard />
        </div>
      </div>
    </div>
  )
}