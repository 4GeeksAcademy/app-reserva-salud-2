import React from "react";
import { backendApi } from "../store/flux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export const TarjetaCitasUsuario = ({ appointment }) => {
  const navigate = useNavigate();

  const cancelAppointment = async () => {
    try {
      const response = await backendApi.post('/refund_payment', { payment_id: appointment?.data_pay?.is_payment });
      const { data } = response;

      if (data.status === 'approved') {
        toast.success('Reserva cancelada con éxito');
        navigate('/');
      }
    } catch (error) {
      console.log(error);
      toast.error('Error cancelando la reserva');
    }
  };


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
