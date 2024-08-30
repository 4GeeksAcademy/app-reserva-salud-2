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
      <div className="d-flex justify-content-center">
        <div className='card bg-secondary text-white w-75 m-3'>
          <div className="row align-items-center justify-content-center p-3">
            <div className="col-md-4 col-sm-12 text-center">
              <img src="https://avatar.iran.liara.run/public/boy" className='img-fluid rounded-circle' height={100} width={100} alt="" />
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
              {/* <button className='btn bg-primary w-75 text-white text-normal text-center m-1'>Reprogramar </button> */}
              <button className='btn bg-primary w-75 text-white text-normal text-center m-1' data-bs-toggle="modal" data-bs-target="#cancelModal">Cancelar</button>
              <Link to={"/datos-paciente"} className="btn bg-primary w-75 text-white text-normal text-center m-1">
                Datos del paciente
              </Link>
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
      </div>
    </>
  )
}