import React, { useState, useEffect } from "react";
import { backendApi } from "../store/flux";
import { useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';

export const TarjetaCitasUsuario = ({ appointment }) => {
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);
  const [comment, setComment] = useState("");
  const [score, setScore] = useState(0);
  const [hasCommented, setHasCommented] = useState(false);


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
  const appointmentDate = new Date(appointment?.availability?.date).setHours(appointment?.availability?.start_time.split(":")[0], appointment?.availability?.start_time.split(":")[1]); //
  console.log("appointmentDate:", appointmentDate);
  const currentDate = new Date();
  console.log("currentDate:", currentDate);

  // Verificar si la fecha de la cita es menor a la fecha actual
  const isPastAppointment = appointmentDate < currentDate;
  console.log("isPastAppointment:", isPastAppointment);
  return (
    <>
      {/* Contenedor de la tarjeta */}
      <div className="flex flex-col gap-2">
        <div className={`card shadow bg-primary text-primary-content ${isPastAppointment ? 'opacity-50' : ''}`}>
          <div className="card-body">
            <h2 className="card-title mx-auto">{appointment?.type === "presential" ? "Presencial" : "Remoto"}</h2>
            <div>
              <h3 className="text-lg font-semibold">Apellido y nombre especialista:</h3>
              <i className="fa-regular fa-user"></i> {appointment?.availability?.professional?.first_name}{' '}
              {appointment?.availability?.professional?.last_name}
            </div>
            <div>
              <h3 className="text-lg font-semibold">Día de la cita:</h3>
              <i className="fa-regular fa-calendar"></i>{' '}
              {new Date(appointment?.availability?.date).toLocaleDateString('es-UY', { timeZone: 'UTC' })}
            </div>
            <div>
              <h3 className="text-lg font-semibold">Hora de la cita:</h3>
              <i className="fa-regular fa-clock"></i> {appointment?.availability?.start_time}
            </div>
            {hasCommented && <span className="badge bg-success w-100 mb-3">Comentario realizado</span>}
            {
              !isPastAppointment && (
                <button
                  className={`btn btn-primary w-full text-white ${isPastAppointment ? 'btn-primary' : 'bg-blue-400'}`}
                  onClick={cancelAppointment}
                  disabled={isPastAppointment}
                >
                  Cancelar Reserva
                </button>
              )
            }
          </div>
        </div>

        {/* Contenedor del botón modal fuera de la card */}
        {isPastAppointment && (
          <button
            className={`btn btn-primary w-full`}
            onClick={() => {
              if (!hasCommented) {
                document.getElementById('comment_modal').showModal();
              } else {
                toast.info('El servicio ya ha sido comentado.');
              }
            }}
            disabled={hasCommented}
          >
            Comentar Servicio
          </button>
        )}
      </div>

      {/* Modal de DaisyUI */}
      <dialog id="comment_modal" className="modal modal-bottom sm:modal-middle">
        <form method="dialog" className="modal-box">
          <h3 className="font-bold text-lg">Agregar Comentario</h3>

          <div className="py-4">
            {/* Textarea para el comentario */}
            <textarea
              className="textarea textarea-bordered w-full mb-4"
              rows="4"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Escribe tu comentario aquí..."
            ></textarea>

            {/* Input para la puntuación */}
            <h6 className="font-medium">Agregar puntuación del servicio</h6>
            <input
              type="number"
              className="input input-bordered w-full mb-4"
              value={score}
              onChange={(e) => setScore(e.target.value)}
              placeholder="Ingresa un score del 1 al 5"
              min="1"
              max="5"
            />
          </div>

          <div className="modal-action">
            {/* Botón para cerrar el modal */}
            <button type="button" className="btn btn-secondary" onClick={() => document.getElementById('comment_modal').close()}>
              Cerrar
            </button>

            {/* Botón para enviar el comentario */}
            <button type="button" className="btn btn-primary" onClick={() => {
              handleCommentSubmit()
              document.getElementById('comment_modal').close()
            }}>
              Enviar Comentario
            </button>
          </div>
        </form>
      </dialog>
    </>
  );
};