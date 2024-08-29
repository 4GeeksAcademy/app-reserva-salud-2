import React, { useContext, useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useParams } from "react-router-dom";
import { backendApi } from "../store/flux";
import { Context } from "../store/appContext";
import PaymentBrick from '../component/PaymentBrick.jsx';

export const AgendaProfesional = () => {
  const { id } = useParams();
  const { store, actions } = useContext(Context);
  const [professional, setProfessional] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [availableHours, setAvailableHours] = useState([]);
  const [appointment, setAppointment] = useState(null);
  const [showCheckout, setShowCheckout] = useState(false);
  const [amount, setAmount] = useState('');
  const handleCheckoutClick = () => {
    setShowCheckout(true);
  };

  useEffect(() => {
    const getProfessional = async () => {
      try {
        const response = await backendApi.get(
          `/professionals/${id}/availabilities`,
        );
        console.log(response)
        setProfessional(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getProfessional();
  }, [id]);

  const handleDayClick = (date) => {
    setSelectedDate(date);
    const dateToCompare = date.toISOString().split("T")[0];
    const availabilities = professional?.availabilities.filter(
      (availability) =>
        availability.date === dateToCompare ||
        availability.recurrent_dates?.includes(dateToCompare)
    );

    // Obtener todos los horarios disponibles para una misma fecha
    const startAndEndTimes = availabilities?.map((availability) => {
      const appointment = {
        start: availability.start_time,
        end: availability.end_time,
        availability_id: availability.id,
        date: dateToCompare,
        is_available: availability.is_available,
        is_remote: availability.is_remote,
        is_presential: availability.is_presential,
      };
      return appointment;
    });

    setAvailableHours(startAndEndTimes);
  };

  console.log(selectedDate);

  const tilesDisabled = ({ date, view }) => {
    const recurrentDates = professional?.availabilities
      .map((availability) => availability.recurrent_dates)
      .flat();
    const dateToCompare = date.toISOString().split("T")[0];
    return (
      view === "month" &&
      !professional?.availabilities.some(
        (availability) =>
          availability.date === dateToCompare ||
          recurrentDates.includes(dateToCompare)
      )
    );
  };

  const handleCreateAppointment = async () => {
    const response = await actions.createUserAppointment(appointment);
    console.log(response);
  };

  console.log(appointment);
  console.log(professional);

  const handleRefundReservation = async () => {
    try {
      const response = await fetch('https://verbose-space-orbit-q5wjv57g6gvh965-3001.app.github.dev/api/refund_payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          professional_id: 'id' // envío id profesional,falta id cita
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert('Reserva cancelada y reembolso procesado exitosamente.');
      } else {
        alert('Error al cancelar la reserva: ' + data.error);
      }
    } catch (error) {
      console.error('Error al cancelar la reserva:', error);
    }
  };

  return (
    <div className="contenido">
      <h1 className="text-center text-title text-secondary">
        Agenda de{" "}
        {professional?.first_name + " " + professional?.last_name ||
          professional?.email}
      </h1>
      <div className="row">
        <div className="col-sm-12 col-md-6 d-flex justify-content-center">
          <img
            className="img-fluid max-w-50"
            src="https://img.freepik.com/free-vector/businessman-planning-events-deadlines-agenda_74855-6274.jpg?semt=ais_hybrid"
            alt="Illustration"
          />
        </div>
        <div className="col-sm-12 col-md-6 d-flex justify-content-center p-5">
          {professional && (
            <Calendar
              tileDisabled={tilesDisabled}
              onClickDay={handleDayClick}
            />
          )}
        </div>
        <div className="row">
          <div className="col-md-5">
          </div>
          <div className="col-md-7">
            <input type="number" step="0.01" value={amount} onChange={(event) => setAmount(event.target.value)}
              placeholder="Ingrese el monto" className="form-control mb-2 w-50"
            />
          </div>

        </div>
        <div className="d-flex justify-content-center ">
          <button className="btn btn-primary w-25 text-white" onClick={handleCheckoutClick}> Reservar
          </button>
          <button className="btn btn-primary w-25 text-white" onClick={handleCheckoutClick}> Cancelar Reserva
          </button>
        </div>
        {showCheckout && <PaymentBrick
          amount={amount}
          id_profesional={id}
        />}


      </div>
      {selectedDate && (
        <div className="mt-4">
          <h2>
            Horarios disponibles para{" "}
            {selectedDate.toLocaleDateString(undefined, {
              weekday: "long",
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </h2>

          {availableHours.length > 0 ? (
            <div className="list-group">
              {availableHours.map((interval, index) => (
                <div key={index}>
                  <button
                    data-bs-toggle="modal"
                    data-bs-target={"#modalAppointmentType" + index}
                    className={`list-group-item list-group-item-action ${appointment === interval ? "active" : ""
                      }`}
                    onClick={() => setAppointment(interval)}
                    disabled={!interval.is_available}
                  >
                    <p
                      className={`${!interval.is_available && "text-decoration-line-through"
                        }`}
                    >
                      {interval.start} - {interval.end} |{" "}
                    </p>
                    {interval.is_remote && (
                      <span className="badge bg-primary badge-danger">
                        Remoto
                      </span>
                    )}{" "}
                    {interval.is_presential && (
                      <span className="badge bg-primary badge-secondary">
                        Presencial
                      </span>
                    )}
                  </button>
                  <div
                    className="modal fade"
                    id={"modalAppointmentType" + index}
                    tabIndex="-1"
                    aria-labelledby="modalAppointmentTypeLabel"
                    aria-hidden="true"
                  >
                    <div className="modal-dialog">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h1
                            className="modal-title fs-5"
                            id="modalAppointmentTypeLabel"
                          >
                            Modal title
                          </h1>
                          <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                          ></button>
                        </div>
                        <div className="modal-body">
                          <h2>Selecciona el tipo de reserva</h2>

                          {appointment?.is_remote &&
                            appointment?.is_presential ? (
                            <div>
                              <div className="form-check">
                                <input
                                  className="form-check-input"
                                  type="radio"
                                  name="appointmentType"
                                  id="presential"
                                  value="presential"
                                  onChange={() =>
                                    setAppointment({
                                      ...appointment,
                                      type: "presential",
                                    })
                                  }
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="presential"
                                >
                                  Presencial
                                </label>
                              </div>
                              <div className="form-check">
                                <input
                                  className="form-check-input"
                                  type="radio"
                                  name="appointmentType"
                                  id="remote"
                                  value="remote"
                                  onChange={() =>
                                    setAppointment({
                                      ...appointment,
                                      type: "remote",
                                    })
                                  }
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="remote"
                                >
                                  Remota
                                </label>
                              </div>
                            </div>
                          ) : appointment?.is_remote ? (
                            <div className="form-check">
                              <input
                                className="form-check-input"
                                type="radio"
                                name="appointmentType"
                                id="remote"
                                value="remote"
                                onChange={() =>
                                  setAppointment({
                                    ...appointment,
                                    type: "remote",
                                  })
                                }
                              />
                              <label
                                className="form-check-label"
                                htmlFor="remote"
                              >
                                Remota
                              </label>
                            </div>
                          ) : (
                            <div className="form-check">
                              <input
                                className="form-check-input"
                                type="radio"
                                name="appointmentType"
                                id="presential"
                                value="presential"
                                onChange={() =>
                                  setAppointment({
                                    ...appointment,
                                    type: "presential",
                                  })
                                }
                              />
                              <label
                                className="form-check-label"
                                htmlFor="presential"
                              >
                                Presencial
                              </label>
                            </div>
                          )}
                        </div>
                        <div className="modal-footer">
                          <button
                            type="button"
                            className="btn btn-secondary"
                            data-bs-dismiss="modal"
                          >
                            Close
                          </button>
                          <button
                            type="button"
                            className="btn btn-primary"
                            onClick={handleCreateAppointment}
                          >
                            Reservar
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="list-group-item">No hay horarios disponibles</div>
          )}
        </div>
      )}
    </div>
  );
};
