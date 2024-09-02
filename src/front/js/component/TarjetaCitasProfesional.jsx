import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Context } from '../store/appContext';
import toast from 'react-hot-toast';
import { backendApi } from '../store/flux';

export const TarjetaCitasProfesional = ({ appointment }) => {
  const { actions } = useContext(Context);
  const navigate = useNavigate();

  const cancelAppointment = async () => {
    try {
      const response = await backendApi.post('/refund_payment', { payment_id: appointment?.data_pay?.is_payment });
      const { data } = response;
      toast.success('La reserva se canceló correctamente');
      navigate('/');
    } catch (error) {
      console.log(error);
      toast.error('Hubo un problema al cancelar la reserva');
    }
  }

  return (
    <>
<div className="card sm:card-side bg-base-200 border border-base-300 shadow-xl flex flex-col md:flex-row">
  {/* Contenedor de la Imagen */}
  <div className="flex items-center justify-center md:w-1/2 w-full p-4">
    <img
      src={
        appointment.type === "remote"
          ? "https://cdni.iconscout.com/illustration/premium/thumb/telehealth-consultation-illustration-download-in-svg-png-gif-file-formats--online-medical-doctor-virtual-advice-healthcare-pack-illustrations-7723959.png"
          : "https://www.shutterstock.com/image-vector/patient-office-doctor-consultation-visit-600nw-1722916654.jpg"
      }
      alt={appointment.type === "remote" ? "Cita Remota" : "Cita Presencial"}
      className="rounded-lg object-cover w-full h-full"
    />
  </div>

  {/* Contenedor del Cuerpo de la Tarjeta */}
  <div className="card-body flex flex-col items-center justify-between w-full md:w-2/3 p-4">
    {/* Información del Paciente */}
    <div className="flex flex-col items-center w-full mb-4">
      <h2 className="card-title text-primary text-2xl pb-3">
        {appointment.user?.first_name} {appointment.user?.last_name}
      </h2>
      <p>
        <i className="fa-solid fa-location-dot"></i> Modalidad:
      </p>
      <div className="badge badge-outline">
        {appointment.type === "remote" ? "Remoto" : "Presencial"}
      </div>
    </div>

    {/* Información de la Cita */}
    <div className="w-full text-center mb-4">
      <p className='text-xl'>
        <span className='font-bold'>Día:</span> {new Date(appointment.availability?.date).toLocaleDateString("es-UY", { timeZone: "UTC" })}
      </p>
      <p className='text-xl'>
        <span className='font-bold'>Hora:</span> {appointment.availability?.start_time}
      </p>
    </div>

    {/* Botón Cancelar Cita */}
    <div className="w-full text-center">
      <button className="btn btn-secondary" onClick={() => document.getElementById('my_modal_1').showModal()}>
        Cancelar cita
      </button>
    </div>
  </div>
</div>

{/* Modal para Cancelar Cita */}
<dialog id="my_modal_1" className="modal">
  <div className="modal-box">
    <h3 className="text-lg text-primary text-center">
      ¿Deseas cancelar tu cita con {appointment.user?.first_name} {appointment.user?.last_name}?
    </h3>
    <p className="py-4">Hazle saber el motivo de la cancelación:</p>
    <div className="mb-3">
      <textarea id="motivo" name="motivo" rows="4" cols="50" className="input input-bordered w-full" />
    </div>
    <div className="modal-action">
      <form method="dialog">
        <button className="btn mx-2">Cerrar</button>
        <button type="button" className="btn btn-primary" onClick={cancelAppointment}>Cancelar reserva</button>
      </form>
    </div>
  </div>
</dialog>

      {/* <div className="d-flex justify-content-center">
        <div className='card bg-secondary text-white w-75 m-3'>
          <div className="row align-items-center justify-content-center p-3">
            <div className="col-md-4 col-sm-12 text-center">
              <h2 className='text-subtitle text-truncate'>{appointment.user?.first_name} {appointment.user?.last_name}</h2>
            </div>
            <div className="col-md-4 col-sm-12 text-center">
              <h2 className='text-label'>Día: {new Date(appointment.availability?.date).toLocaleDateString("es-UY", { timeZone: "UTC" })}</h2>
              <p className='text-label text-white'>Hora: {appointment.availability?.start_time}</p>
              <h2 className='text-label'>Modalidad:</h2>
              <div className="col">
                <span className="badge rounded-pill py-2 bg-primary">{appointment.type === "remote" ? "Remoto" : "Presencial"}</span>
              </div>
            </div>
            <div className="col-md-4 col-sm-12 d-flex flex-column justify-content-center align-items-center">
              <button className='btn bg-primary w-75 text-white text-normal text-center m-1' data-bs-toggle="modal" data-bs-target="#cancelModal">Cancelar</button>
            </div>
          </div>
        </div>
      </div>
      <div className="modal fade" id="cancelModal" tabIndex="-1" aria-labelledby="cancelModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <form className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="cancelModalLabel">Cancelar cita con {appointment.user?.first_name} {appointment.user?.last_name}</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <p className="text-center">Motivo de la cancelación</p>
              <textarea className="form-control" id="motive" rows="3"></textarea>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
              <button type="button" className="btn btn-danger" data-bs-dismiss="modal" onClick={cancelAppointment}>Cancelar reserva</button>
            </div>
          </form>
        </div>
      </div> */}
    </>
  )
}