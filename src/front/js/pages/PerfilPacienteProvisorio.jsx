import React, { useContext, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { TarjetaProximaCita } from "../component/TarjetaCitasProximas.jsx";
import { TarjetaCitasUsuario } from "../component/TarjetaCitas.jsx";
import "swiper/css/autoplay";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext.js";

export const VistaPerfilPaciente = () => {
  const { store, actions } = useContext(Context);
  const [userAppointments, setUserAppointments] = useState([]);

  useEffect(() => {
    const getUserAppointments = async () => {
      const response = await actions.getUserAppointments();
      setUserAppointments(response);
    }

    getUserAppointments();
  }, []);

  console.log(userAppointments);

  return (
    <div className="contenido container">
      <div className="row">
        <div className="col">
          <h1 className="text-title text-secondary text-center">Bienvenido, {store?.currentUser?.first_name} {store?.currentUser?.last_name}</h1>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <h3 className="text-subtitle text-center">Próximas citas</h3>
        </div>
      </div>
      <div className="row">
        <div className="col">
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
            <SwiperSlide>
              Slider1
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
      <div className="row">
        <div className="col text-center">
          <Link to={"/profesionales"} className="btn text-btn text-white bg-primary">
            <i className="fa-solid fa-user-plus"></i> Agendar nueva cita
          </Link>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <h3 className="text-subtitle">Todas las citas</h3>
        </div>
      </div>
      <div className="row row-cols-1 row-cols-md-3">
        {
          userAppointments?.map((appointment) => (
            <TarjetaCitasUsuario key={appointment.id} appointment={appointment} />
          ))
        }
      </div>
    </div>
  )
};