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
  const [loading, setLoading] = useState(true);

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
      } finally {
        setLoading(false);
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


  if (loading) {
    return (
      <div className="container min-h-screen mx-auto pt-20">
        <div className="flex justify-center">
          <div className="skeleton h-8 w-[450px]"></div>
        </div>

        <div className="grid md:grid-cols-2 mt-6 gap-4">
          <div className="skeleton h-96 w-full"></div>
          <div className="skeleton h-96 w-full"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="container flex flex-col justify-center min-h-screen mx-auto pt-20">
      <h1 className="text-4xl font-bold text-base-content text-center">
        Agenda de{" "}
        {professional?.first_name + " " + professional?.last_name ||
          professional?.email}
      </h1>

      <div className="grid md:grid-cols-2 justify-items-center my-12">

        {professional && (
          <Calendar
            tileDisabled={tilesDisabled}
            onClickDay={handleDayClick}
          />
        )}

        <div className="w-full">
          {selectedDate && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-base-content text-center">
                Horarios disponibles para{" "}
                {selectedDate.toLocaleDateString(undefined, {
                  weekday: "long",
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </h2>

              {availableHours.length > 0 && availableHours.some(interval => interval.is_available) ? (
                <ul className="list-none flex flex-col items-center gap-2 mt-8">
                  {
                    availableHours.map((interval) => (
                      interval.is_available && (
                        <li className="form-control bg-base-200 rounded-box" key={interval.availability_id}>
                          <label className="label cursor-pointer px-8">
                            <input className="radio checked:bg-blue-500" type="radio" name="intervals" value={interval.availability_id} onChange={(e) => setAppointment(interval)} id={`time-${interval.availability_id}`} />
                            <span className="label-text text-lg font-medium pl-8">{interval.start} - {interval.end}</span>
                          </label>
                        </li>
                      )
                    ))
                  }
                </ul>
              ) : (
                <h2 className="text-2xl font-bold text-base-content">No hay horarios disponibles</h2>
              )}
            </div>
          )}
          {appointment && (
            <>
              <h3 className="text-xl font-bold text-base-content text-center">Elegir tipo de reserva</h3>

              {appointment.is_remote && (
                <div className="form-control flex flex-col items-center">
                  <label className="label cursor-pointer">
                    <input className="radio checked:bg-blue-500" type="radio" name="reservationType" id="remote" value="remote" onChange={(e) => {
                      setAppointment({ ...appointment, reservationType: e.target.value })
                      setShowCheckout(true)
                    }} />
                    <span className="label-text text-lg font-medium pl-8">Remoto</span>
                  </label>
                </div>
              )}
              {appointment.is_presential && (
                <div className="form-control flex flex-col items-center">
                  <label className="label cursor-pointer">
                    <input className="radio checked:bg-blue-500" type="radio" name="reservationType" id="presential" value="presential" onChange={(e) => {
                      setAppointment({ ...appointment, reservationType: e.target.value })
                      setShowCheckout(true)
                    }} />
                    <span className="label-text text-lg font-medium pl-6">Presencial</span>
                  </label>
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


// const handleCreateAppointment = async () => {
//   const response = await actions.createUserAppointment(appointment);
//   console.log(response);
// };

// const handleRefundReservation = async () => {
//   try {
//     const response = await fetch(`${process.env.BACKEND_URL}/api/refund_payment`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         professional_id: professionalId // envío id profesional,falta id cita
//       }),
//     });

//     const data = await response.json();

//     if (response.ok) {
//       alert('Reserva cancelada y reembolso procesado exitosamente.');
//     } else {
//       alert('Error al cancelar la reserva: ' + data.error);
//     }
//   } catch (error) {
//     console.error('Error al cancelar la reserva:', error);
//   }
// };

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