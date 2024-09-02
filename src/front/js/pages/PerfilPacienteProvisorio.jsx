import React, { useContext, useEffect, useState } from "react";
import { TarjetaProximaCita } from "../component/TarjetaCitasProximas.jsx";
import { TarjetaCitasUsuario } from "../component/TarjetaCitas.jsx";
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
    <div className="contenido container mx-auto mb-5 pt-16">
    {/* Flex container for centering the welcome message */}
    <div className="flex flex-col items-center">
      <h1 className="mb-5 text-5xl font-bold text-center">
        Bienvenido, {store?.currentUser?.first_name} {store?.currentUser?.last_name}
      </h1>
    </div>
    
    <div className="text-left mb-5">
      <h3 className="text-lg font-semibold pb-3">Profesionales destacados</h3>
    </div>
  
    <div className="carousel w-full">
      {comments.map((comment, index) => (
        <div key={index} id={`item${index + 1}`} className="carousel-item w-full flex justify-center">
          <div className="card bg-secondary text-white w-3/4 p-3 flex flex-col md:flex-row items-center justify-center">
            <div className="text-center md:w-1/2">
              <img
                src={comment.profile_picture}
                className="rounded-full mx-auto mb-3"
                height={100}
                width={100}
                alt={`${comment.first_name} ${comment.last_name}`}
              />
              <h2 className="text-xl font-semibold truncate">
                {comment.first_name} {comment.last_name}
              </h2>
            </div>
            <div className="md:w-1/2 text-left">
              <h2 className="text-base font-medium">Ciudad: {comment.city_name}</h2>
              <p className="text-base text-white">Email: {comment.email}</p>
              <h2 className="text-base font-medium">Calificación:</h2>
              <div>
                <span className="badge bg-primary text-white py-1 px-3 rounded-full">
                  {comment.average_score}
                </span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  
    <div className="flex w-full justify-center gap-2 py-2">
      {comments.map((_, index) => (
        <a href={`#item${index + 1}`} key={index} className="btn btn-xs">
          {index + 1}
        </a>
      ))}
    </div>
  
    <div className="text-center pt-3">
      <Link to="/profesionales" className="btn bg-primary text-white">
        <i className="fa-solid fa-user-plus"></i> Agendar nueva cita
      </Link>
    </div>
  
    <div className="mt-5">
      <h3 className="text-lg font-semibold">Todas las citas</h3>
    </div>
  
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {userAppointments?.map((appointment) => (
        <TarjetaCitasUsuario key={appointment.id} appointment={appointment} />
      ))}
    </div>
  </div>
  
  )
}