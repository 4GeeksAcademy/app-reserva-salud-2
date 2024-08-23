import React from "react";
import { backendApi } from "../store/flux";

export const TarjetaCitasUsuario = ({ appointment }) => {
  const cancelAppointment = async () => {
    const response = await backendApi.delete(
      `/users/${appointment.user.id}/appointments/${appointment.id}`
    );
    console.log(response);
  };

  return (
    <div className="d-flex justify-content-center">
      <div className="card bg-tertiary text-primary mb-3 w-75">
        <div className="row align-items-center justify-content-center p-3">
          <div className="col-md-4 col-sm-12 text-center">
            <img
              src={appointment?.fotoprofesional}
              className="img-fluid"
              height={100}
              width={100}
              alt=""
            />
            <h2 className="text-subtitle text-truncate">
              {appointment.profesional}
            </h2>
          </div>
          <div className="col-md-3 col-sm-12 text-center">
            <h2 className="text-label">
              Día:{" "}
              {new Date(appointment.date).toLocaleDateString("es-ES", {
                timeZone: "UTC",
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </h2>
            {/* <p className='text-label'>Hora: {appointment.hora}</p> */}
            <h2 className="text-label">Modalidad:</h2>
            <div className="col">
              <span className="badge rounded-pill py-2 bg-primary">
                {appointment?.type}
              </span>
            </div>
          </div>
          <div className="col-md-3 col-sm-12 d-flex flex-column justify-content-center align-items-center">
            <button className="btn bg-secondary w-75 text-white text-label text-btn d-flex justify-content-between m-1">
              Reprogramar
            </button>
            <button
              onClick={cancelAppointment}
              className="btn bg-secondary w-75 text-white text-label text-btn d-flex justify-content-between m-1"
            >
              Cancelar{" "}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
