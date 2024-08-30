import React,{useState,useEffect} from "react";
import { backendApi } from "../store/flux";
import toast, { Toaster } from 'react-hot-toast';

export const TarjetaCitasUsuario = ({ appointment }) => {
  const [showModal, setShowModal] = useState(false);
  const [comment, setComment] = useState("");
  const [score, setScore] = useState(0);
  const [hasCommented, setHasCommented] = useState(false);
  
  
  const cancelAppointment = async () => {
    const response = await backendApi.delete(
      `/users/${appointment.user.id}/appointments/${appointment.id}`
    );
    console.log(response);
  };
  useEffect(() => {
    const commented = localStorage.getItem(`commented_${appointment.id}`) === 'true';
    setHasCommented(commented);
  }, [appointment.id]);

  
  //capturo comentario del usuario
  const handleCommentSubmit = async () => {
    try {
      // Realizar la petición para guardar el comentario en la base de datos
        const response = await backendApi.post(`/comments`, {
        professional_id: appointment?.availability?.professional?.id,
        user_id: appointment.user.id,
        appointment_id: appointment.id,
        comment,
        score
      });

      if (response.status === 201) {
        toast.success("Tu comentario ha sido enviado correctamente.");
        setShowModal(false);
        setComment(""); // Limpiar el campo de comentario
        setScore(0); // Reiniciar el score
        setHasCommented(true);
        localStorage.setItem(`commented_${appointment.id}`, 'true');
      }
    } catch (error) {
      toast.error("No se pudo enviar el comentario. Inténtalo de nuevo.");
      console.error(error);
    }
  };
  console.log(appointment);
  const appointmentDate = new Date(appointment?.availability?.date);
  const currentDate = new Date();

  // Verificar si la fecha de la cita es menor a la fecha actual
  const isPastAppointment = appointmentDate < currentDate;
  // console.log("isPastAppointment:", isPastAppointment);
  return (
     
    <div className="col">
      <div className={`card shadow ${isPastAppointment ? 'bg-light opacity-50' : ''}`}>
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
              {hasCommented && <span className="badge bg-success w-100 mb-3">Comentario realizado</span>}
            </div>
            <div className="col">
              <button className={`btn w-100  ${isPastAppointment ? 'btn-dark' : 'btn-danger'}`}
              onClick={cancelAppointment}
              disabled={isPastAppointment}
              >
                Cancelar Reserva
              </button>
              </div>
          </div>
          {/* Contenedor del botón "Comentar" */}
          {isPastAppointment && (
            <div className="row mt-2">
              <div className="col">
                <button
                  className="btn btn-primary w-100"
                  onClick={() => {
                    if (!hasCommented) {
                      setShowModal(true);
                    } else {
                      toast.info("El servicio ya ha sido comentado.");
                    }
                  }}
                  disabled={hasCommented} // Deshabilitar si ya se ha comentado
                  style={{ opacity: hasCommented ? 0.5 : 1 }}
                  >
                  Comentar Servicio
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modal para realizar el comentario */}
      {showModal && (
        <div className="modal show d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Agregar Comentario</h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
              <div className="modal-body">
                <textarea
                  className="form-control"
                  rows="4"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Escribe tu comentario aquí..."
                ></textarea>
                <h6>Agregar puntuación del servicio</h6>
                <input
                  type="number"
                  className="form-control"
                  value={score}
                  onChange={(e) => setScore(e.target.value)}
                  placeholder="Ingresa un score del 1 al 5"
                  min="1"
                  max="5"
                />
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>
                  Cerrar
                </button>
                <button type="button" className="btn btn-primary" onClick={handleCommentSubmit}>
                  Enviar Comentario
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};