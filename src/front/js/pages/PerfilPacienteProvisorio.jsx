import React, { useContext, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { TarjetaProximaCita } from "../component/TarjetaCitasProximas.jsx";
import { TarjetaCitasUsuario } from "../component/TarjetaCitas.jsx";
import "swiper/css/autoplay";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext.js";
import { backendApi } from "../store/flux.js";

export const VistaPerfilPaciente = () => {
  const { store, actions } = useContext(Context);
  const [userAppointments, setUserAppointments] = useState([]);
  const [comments, setComments]= useState([]);
  
  useEffect(() => {
    const getUserAppointments = async () => {
      const response = await actions.getUserAppointments();
      setUserAppointments(response);
    }
    const fetchComments = async () => {
      try {
        const res = await fetch(process.env.BACKEND_URL +'/api/get_professionals_comments_score');
        const data = await res.json();
        // setComments(data); // Guarda los comentarios en el estado
        console.log(data)
        if (Array.isArray(data)) {
          setComments(data); 
        } else {
          console.error("Error: los datos recibidos no son un array", data);
        }
      
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };
    getUserAppointments();
    fetchComments()
  }, []);

  return (
    <div className="contenido container mb-5">
      <div className="row">
        <div className="col">
          <h1 className="mb-5 text-5xl font-bold text-center">Bienvenido, {store?.currentUser?.first_name} {store?.currentUser?.last_name}</h1>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <h3 className="text-subtitle text-center pb-3">Próximas citas</h3>
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
              
            }}
          >
            {comments.map((comment,index) => (
            <SwiperSlide key={index}>
              <div className="d-flex justify-content-center">
                <div className='card bg-secondary text-white w-75' style={{height:'200px'}} >
                  <div className="row align-items-center justify-content-center p-3">
                    <div className="col-5 text-center">
                      <img src={comment.profile_picture} className='img-fluid' height={100} width={100} alt="" />
                        <h2 className='text-subtitle text-truncate'>{comment.first_name} {comment.last_name}</h2>
                          </div>
                            <div className="col-7">
                              <h2 className='text-label'>Ciudad: {comment.city_name}</h2>
                              <p className='text-label text-white'>Email: {comment.email}</p>
                              <h2 className='text-label'>Calificacion:</h2>
                              <div className="col">
                                  <span className="badge rounded-pill py-2 bg-primary">{comment.average_score}</span>
                              </div>
                            </div>
                        </div>
                     </div>
                  </div>          
             {comment.user_id}{comment.comment}{comment.score}
            </SwiperSlide>
          ))}
          </Swiper>
        </div>
      </div>
      <div className="row">
        <div className="col text-center pt-3">
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