import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../store/appContext.js";
import { Link } from "react-router-dom";
// import { PopupButton } from "react-calendly";

export const VistaInfoProfesional = () => {
  const { id } = useParams();
  const { actions } = useContext(Context);
  const [professional, setProfessional] = useState({});

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
      stars.push(<i key={i} className="fa-solid fa-star"></i>);
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
    <div className="container contenido py-5">
      <div className="mb-3 row justify-content-center">
        <div className="col text-center">
          <img
            src={professional.profile_picture}
            className="img-fluid"
            width={200}
            height={200}
            alt="Profile picture"
          />
        </div>
      </div>

      <div className="row gy-3">
        <div className="col-12 text-center">
          <h1 className="text-title text-primary">
            {professional.first_name} {professional.last_name}
          </h1>
        </div>
        <div className="col-12 text-center">
          <h2 className="text-subtitle">{professional.title}</h2>
        </div>
        <div className="col-12 text-center">
          <strong>{professional.state}</strong>
        </div>
      </div>

      <div className="row justify-content-center">
        <div className="col text-center">
          <h2 className="text-subtitle">Calificación promedio</h2>
          <p>{renderStars(averageScore())}</p>
        </div>
        <div className="col text-center">
          <h2 className="text-subtitle">Comentarios</h2>
          <h2 className="text-subtitle">{professional.comments?.length}</h2>
        </div>
      </div>

      <div className="row">
        <div className="col">
          <h2 className="text-subtitle">Descripción</h2>
          <p className="text-body">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloremque
            ad possimus aliquid reiciendis. Quibusdam necessitatibus aperiam
            eveniet molestias eum eligendi assumenda nobis consectetur expedita
            praesentium! Harum corrupti tempore similique nisi.
          </p>
        </div>
      </div>

      <div className="row gy-3">
        <div className="col-12">
          <h2 className="text-subtitle">Comentarios</h2>
        </div>
        {professional.comments?.length > 0 ? (
          professional.comments.map((comment) => (
            <div key={comment.id} className="col-12">
              <div className="card">
                <div className="card-header">
                  <div className="row">
                    <div className="col-auto me-auto">
                      <h2 className="text-subtitle">
                        {comment.user.first_name} {comment.user.last_name}
                      </h2>
                    </div>
                    <div className="col-auto">{renderStars(comment.score)}</div>
                  </div>
                </div>
                <div className="card-body">
                  <p className="card-text text-body">{comment.comment}</p>
                  <small className="text-muted">{comment.created_at}</small>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-12">
            <p>No hay comentarios</p>
          </div>
        )}
                <div className="d-flex justify-content-center m-4">
          <Link to={"/agenda"} className="btn text-btn text-white bg-primary">
            <i className="fa-solid fa-user-plus"></i> Agendar nueva cita
          </Link>
        </div>
      </div>

      {/* <div className="mt-5 row">
        <div className="col text-center">
          <PopupButton
            url={professional.url_calendly}
            rootElement={document.getElementById("app")}
            text="Ver agenda"
            className="btn bg-primary text-white"
          />
        </div>
      </div> */}
    </div>
  );
};
