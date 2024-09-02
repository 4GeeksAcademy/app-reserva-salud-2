import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Context } from "../store/appContext.js";
import { Link } from "react-router-dom";

export const VistaInfoProfesional = () => {
  const { id } = useParams();
  const { store, actions } = useContext(Context);
  const [professional, setProfessional] = useState({});
  const navigate = useNavigate();
  const [login, setLogin] = useState(true);

  useEffect(() => {
    const getProfessional = async (professionalId) => {
      const professional = await actions.getProfessional(professionalId);
      setProfessional(professional);
      setLogin(false);
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

  if (login) {
    return (
      <div className="container mx-auto min-h-screen pt-20">
        <div className="flex justify center items-start">
          <div className="flex w-full max-w-4xl">
            <div className="flex-1 flex justify-center items-center">
              <div className="skeleton rounded-full h-64 w-64"></div>
            </div>
            <div className="flex-1 text-center pb-6">
              <div className="my-4 skeleton h-8"></div>
              <div className="skeleton h-6 w-64 mx-auto"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto min-h-screen px-4 pt-20 max-w-4xl">
      <div className="flex flex-col justify-evenly items-center gap-8 bg-base-200 border border-base-300 rounded-box p-8">
        <div className="flex flex-col md:flex-row items-center gap-10">
          <img
            src={professional.profile_picture}
            className="w-64 rounded-full"
            alt="Profile picture"
          />
          <div className="flex flex-col justify-center">
            <h1 className="my-4 text-3xl text-primary font-bold text-center">{professional.first_name} {professional.last_name}</h1>
            <h2 className="text-xl font-bold pb-8 text-primary text-center">{professional?.specialities?.map(speciality => speciality.name).join(", ")}</h2>

            <div className="flex gap-8">
              <div>
                <h2 className="text-md font-bold">Calificación promedio</h2>
                <p className="text-center">{renderStars(averageScore())}</p>
              </div>

              <div>
                <h2 className="text-md font-bold">Comentarios</h2>
                <p className="text-center text-xl font-bold">{professional.comments?.length}</p>
              </div>

            </div>
          </div>
        </div>
        <div className="w-full mt-8 px-8">
          <h2 className="text-xl font-bold mb-4">Sobre mí</h2>
          <p className="text-body mx-auto max-w-4xl text-base">
            Profesional de la salud con una sólida formación académica y amplia experiencia en el área médica.
            Tengo un fuerte compromiso con brindar atención de calidad, avalado con una trayectoria destacada
            en el diagnóstico y tratamiento de diversas condiciones de salud. Promuevo un enfoque integral y
            empático centrado en las necesidades individuales de cada paciente, garantizando un cuidado personalizado y basado en las
            mejores prácticas médicas. Además, mantengo una continua actualización en mi especialidad,
            participando en cursos y certificaciones para ofrecer siempre los tratamientos más avanzados
            y efectivos.
          </p>
        </div>
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
