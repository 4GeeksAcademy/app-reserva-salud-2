import React from "react";
import { backendApi } from "../store/flux";

export const TarjetaCitasUsuario = ({ appointment }) => {
  const cancelAppointment = async () => {
    const response = await backendApi.delete(
      `/users/${appointment.user.id}/appointments/${appointment.id}`
    );
    console.log(response);
  };

  console.log(appointment);

  return (
    <div className="col">
      <div className="card shadow">
        <div className="card-body">
          <div className="row justify-content-between">
            <div className="col text-center">
              <h5 className="card-title">{appointment?.availability?.professional?.appointment_type}</h5>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col">
              <p className="card-text text-body"><i className="fa-regular fa-user"></i> {appointment?.availability?.professional?.first_name} {appointment?.availability?.professional?.last_name}</p>
              <p className="card-text text-body"><i className="fa-regular fa-calendar"></i> {new Date(appointment?.availability?.date).toLocaleDateString('es-UY', { timeZone: 'UTC' })}</p>
              <p className="card-text text-body"><i className="fa-regular fa-clock"></i> {appointment?.availability?.start_time}</p>
            </div>
            <div className="col-auto">
              <button className="btn btn-danger" onClick={cancelAppointment}>Cancelar Reserva</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
