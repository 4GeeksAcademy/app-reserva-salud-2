import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Context } from "../store/appContext.js";
import { Link } from "react-router-dom";

export const VistaInfoProfesional = () => {
  const { id } = useParams();
  const { store, actions } = useContext(Context);
  const [professional, setProfessional] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const getProfessional = async (professionalId) => {
      const professional = await actions.getProfessional(professionalId);
      setProfessional(professional);
    };

    getProfessional(id);
  }, []);

  const renderStars = (score) => {
    const filledStars = Math.floor(score);
    const emptyStars = 5 - filledStars;

    const stars = [];

    for (let i = 0; i < filledStars; i++) {
      stars.push(<i key={i} className="fa-solid fa-star text-primary"></i>);
    }

    for (let i = 0; i < emptyStars; i++) {
      stars.push(<i key={filledStars + i} className="fa-regular fa-star"></i>);
    }

    return stars;
  };

  const averageScore = () => {
    if (professional.comments?.length > 0) {
      const totalScore = professional.comments.reduce(
        (acc, comment) => acc + comment.score,
        0
      );
      return Math.floor(totalScore / professional.comments.length);
    }

    return 0;
  };

  return (
    <div className="pt-28">
      <div className="flex justify-center items-start">
        <div className="flex w-full max-w-4xl">
          <div className="flex-1 flex justify-center items-center">
            <img
              src={professional.profile_picture}
              className="w-64 rounded-full"
              alt="Profile picture"
            />
          </div>
          <div className="flex-1 pb-6">
            <div className="text-center">
              <h1 className="my-4 text-3xl text-primary font-bold">{professional.first_name} {professional.last_name}</h1>
              <h2 className="text-xl pb-8 text-primary">{professional?.specialities?.map(speciality => speciality.name).join(", ")}</h2>
            </div>
              <div className="text-center pb-4">
                <h2 className="text-lg">Calificación promedio</h2>
                <p>{renderStars(averageScore())}</p>
              </div>
              <div className="text-center">
                <h2 className="text-lg">Comentarios</h2>
                <p>{professional.comments?.length}</p>
              </div>
          </div>
        </div>
      </div>
      <div className="w-full mt-8 px-8">
        <p className="text-body text-center mx-auto max-w-4xl text-justify text-base">
          Profesional de la salud con una sólida formación académica y amplia experiencia en el área médica.
          Tengo un fuerte compromiso con brindar atención de calidad, avalado con una trayectoria destacada 
          en el diagnóstico y tratamiento de diversas condiciones de salud. Promuevo un enfoque integral y 
          empático centrado en las necesidades individuales de cada paciente, garantizando un cuidado personalizado y basado en las
          mejores prácticas médicas. Además, mantengo una continua actualización en mi especialidad,
          participando en cursos y certificaciones para ofrecer siempre los tratamientos más avanzados
          y efectivos.
        </p>
      </div>
      <div className="w-full mt-8">
  <h2 className="text-xl text-neutral text-center mb-4">Comentarios</h2>
  <div className="flex flex-col items-center">
    {professional.comments?.length > 0 ? (
      professional.comments.map((comment) => (
        <div key={comment.id} className="card w-full max-w-4xl bg-base-100 shadow-xl mb-4 border border-base-300">
          <div className="card-body">
          <div className="flex justify-between items-center mb-2">
              <h2 className="font-bold">{comment.user.first_name} {comment.user.last_name}</h2>
              <div>{renderStars(comment.score)}</div>
            </div>
            <p className="card-text text-body">{comment.comment}</p>
            <small className="text-center text-neutral-content">{comment.created_at}</small>
          </div>
        </div>
      ))
    ) : (
      <p>No hay comentarios</p>
    )}
  </div>
</div>

        <div className="flex justify-center m-4">
          <button onClick={() => navigate(`/agenda/${id}`)} className="btn btn-primary" disabled={!store.currentUser}>
            {!store.currentUser
              ? (<><i className="fa-solid fa-arrow-right-to-bracket"></i> Iniciar sesión para agendar cita</>)
              : (<><i className="fa-solid fa-calendar-plus"></i> Agendar cita</>)
            }
          </button>
        </div>
      </div>
  );
};
