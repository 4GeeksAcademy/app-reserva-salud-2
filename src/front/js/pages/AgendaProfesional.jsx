import React, { useContext, useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useParams } from "react-router-dom";
import { backendApi } from "../store/flux";
import { Context } from "../store/appContext";
import PaymentBrick from '../component/PaymentBrick.jsx';
import { Wallet } from "../component/Wallet.jsx";

export const AgendaProfesional = () => {
  const { professionalId } = useParams();
  const { store, actions } = useContext(Context);
  const [professional, setProfessional] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [availableHours, setAvailableHours] = useState([]);
  const [appointment, setAppointment] = useState(null);
  const [showCheckout, setShowCheckout] = useState(false);
  const [amount, setAmount] = useState(100);
  const handleCheckoutClick = () => {
    setShowCheckout(true);
  };

  useEffect(() => {
    const getProfessional = async () => {
      try {
        const response = await backendApi.get(
          `/professionals/${professionalId}/availabilities`,
        );
        console.log(response)
        setProfessional(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getProfessional();
  }, [professionalId]);

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
        weekly: availability.weekly,
        professional: availability.professional,
      };
      return appointment;
    });

    setAvailableHours(startAndEndTimes);
  };

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

  const handleRefundReservation = async () => {
    try {
      const response = await fetch(`${process.env.BACKEND_URL}/api/refund_payment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          professional_id: professionalId // envío id profesional,falta id cita
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
    <div className="contenido container">
      <h1 className="text-center text-title text-secondary">
        Agenda de{" "}
        {professional?.first_name + " " + professional?.last_name ||
          professional?.email}
      </h1>
      <div className="row justify-content-center my-4">
        <div className="col text-center">
          {professional && (
            <Calendar
              tileDisabled={tilesDisabled}
              onClickDay={handleDayClick}
            />
          )}
        </div>
        <div className="col">
          {selectedDate && (
            <div className="">
              <h2>
                Horarios disponibles para{" "}
                {selectedDate.toLocaleDateString(undefined, {
                  weekday: "long",
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </h2>

              {availableHours.length > 0 && availableHours.some(interval => interval.is_available) ? (
                <div className="list-group my-3">
                  {
                    availableHours.map((interval) => (
                      interval.is_available && (
                        <li className="list-group-item" key={interval.availability_id}>
                          <input className="form-check-input me-1" type="radio" name="intervals" value={interval.availability_id} onChange={(e) => setAppointment(interval)} id={`time-${interval.availability_id}`} />
                          <label className="form-check-label" htmlFor={`time-${interval.availability_id}`}>{interval.start} - {interval.end}</label>
                        </li>
                      )
                    ))
                  }
                </div>
              ) : (
                <h4>No hay horarios disponibles</h4>
              )}
            </div>
          )}
          {appointment && (
            <>
              <h2>Elegir tipo de reserva</h2>

              {appointment.is_remote && (
                <div className="form-check form-check-inline">
                  <input className="form-check-input" type="radio" name="reservationType" id="remote" value="remote" onChange={(e) => {
                    setAppointment({ ...appointment, reservationType: e.target.value })
                    setShowCheckout(true)
                  }} />
                  <label className="form-check-label" htmlFor="remote">Remoto</label>
                </div>
              )}
              {appointment.is_presential && (
                <div className="form-check form-check-inline">
                  <input className="form-check-input" type="radio" name="reservationType" id="presential" value="presential" onChange={(e) => {
                    setAppointment({ ...appointment, reservationType: e.target.value })
                    setShowCheckout(true)
                  }} />
                  <label className="form-check-label" htmlFor="presential">Presencial</label>
                </div>
              )}
            </>
          )}
        </div>
      </div>
      <div className="row justify-content-center">
        <div className="col text-center">
          {showCheckout && appointment && (
            <Wallet appointment={appointment} />
          )}
        </div>
      </div>
    </div>
  );
};



// <>
//   <button
//     key={interval.availability_id}
//     className={`list-group-item list-group-item-action d-flex justify-content-between align-items-center ${appointment === interval ? "active" : ""
//       }`}
//     onClick={() => {
//       setAppointment(interval)
//       setShowCheckout(true)
//     }}
//   >
//     <div className="ms-2 me-auto">
//       <h4 className="text-label fw-bold">
//         {interval.start} - {interval.end}
//       </h4>
//     </div>
//     <div className="gap-3">
//       {interval.is_remote && (
//         <h4 className="badge rounded-pill bg-primary badge-danger">
//           Remoto
//         </h4>
//       )}{" "}
//       {interval.is_presential && (
//         <h4 className="badge rounded-pill bg-primary badge-secondary">
//           Presencial
//         </h4>
//       )}
//     </div>
//   </button>
// </>