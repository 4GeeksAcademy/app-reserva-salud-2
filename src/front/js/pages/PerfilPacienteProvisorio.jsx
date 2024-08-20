import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { TarjetaProximaCita } from "../component/TarjetaCitasProximas.jsx";
import { TarjetaCitasUsuario } from "../component/TarjetaCitas.jsx";
import "swiper/css/autoplay";
import { Link } from "react-router-dom";

const citas = [

  {
    id: "3",
    fotoprofesional: "https://avatar.iran.liara.run/public/boy",
    dia: "5 de setiembre",
    hora: "10:30",
    modalidad: "Virtual",
    profesional: "Carlos Villar",
    especialidad: "odontólogo"
  },
  {
    id: "1",
    fotoprofesional: "https://avatar.iran.liara.run/public/girl",
    dia: "10 de agosto",
    hora: "9:30",
    modalidad: "Presencial",
    profesional: "Juana Pérez",
    especialidad: "nutricionista"
  },
  {
    id: "2",
    fotoprofesional: "https://avatar.iran.liara.run/public/boy",
    dia: "30 de agosto",
    hora: "9:30",
    modalidad: "Virtual",
    profesional: "Pedro Fuentes",
    especialidad: "nutricionista"
  },

]

export const VistaPerfilPaciente = () => {

  return (
    <div className="contenido">
      <h1 className="text-title text-secondary text-center p-4 m-4">Bienvenido, Nombre Paciente</h1>
      <div>
        <div className="d-flex justify-content-center">
          <h3 className="text-subtitle mx-3 w-75">Próximas citas</h3>
        </div>
        <Swiper
          modules={[Autoplay]}
          slidesPerView={1}
          spaceBetween={10}
          loop={true}
          autoplay={{ delay: 2500, disableOnInteraction: true }}
          breakpoints={{
            1024: {
              slidesPerView: 1,
              spaceBetween: 20,
            },
            1440: {
              slidesPerView: 3,
              spaceBetween: 20,
            },
          }}
        >
          {citas.map((citas) => (
            <SwiperSlide key={citas.id}>
              <TarjetaProximaCita citas={citas} />
            </SwiperSlide>))}
        </Swiper>
        <div className="d-flex justify-content-center m-4">
          <Link to={"/profesionales"} className="btn text-btn text-white bg-primary">
            <i className="fa-solid fa-user-plus"></i> Agendar nueva cita
          </Link>
        </div>
        <div className="d-flex justify-content-center">
          <h3 className="text-subtitle mx-3 w-75">Todas las citas</h3>
        </div>
        {citas.map((citas) => (
          <TarjetaCitasUsuario key={citas.id} citas={citas} />))}

      </div>
    </div>
  )
};