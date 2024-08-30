import React, { useContext, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { backendApi } from "../store/flux";
import toast from "react-hot-toast";
import { Context } from "../store/appContext";
import toast from "react-hot-toast";

export const DisponibilidadProfesional = () => {
    const { store } = useContext(Context);
    const [fechaSeleccionada, setFechaSeleccionada] = useState(new Date());
    const [horasSeleccionadas, setHorasSeleccionadas] = useState([]);
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const [duration, setDuration] = useState(30);
    const [isRemote, setIsRemote] = useState(false);
    const [isPresential, setIsPresential] = useState(false);
    const [isWeekly, setIsWeekly] = useState(false);

    const minDate = new Date();
    const maxDate = new Date(new Date().setMonth(new Date().getMonth() + 12));

    const handleConfirmar = async () => {
        const start = new Date(fechaSeleccionada);
        const end = new Date(fechaSeleccionada);
        const [startHour, startMinute] = startTime.split(":").map(Number);
        const [endHour, endMinute] = endTime.split(":").map(Number);
        start.setHours(startHour, startMinute);
        end.setHours(endHour, endMinute);

        const intervalos = [];
        let current = new Date(start);

        while (current < end) {
            const next = new Date(current);
            next.setMinutes(current.getMinutes() + duration);
            if (next > end) break;
            intervalos.push({
                professional_id: store?.currentProfessional?.id,
                date: fechaSeleccionada.toISOString().split("T")[0],
                start_time: current.toTimeString().split(" ")[0],
                end_time: next.toTimeString().split(" ")[0],
                is_available: true,
                is_remote: isRemote,
                is_presential: isPresential,
                weekly: isWeekly,
            });
            current = next;
        }

        try {
            const response = await Promise.all(
                intervalos.map((intervalo) =>
                    backendApi.post("/professionals/availabilities", intervalo, {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${localStorage.getItem("token")}`,
                        },
                    })
                )
            );

            const successResponses = response.filter((res) => res.status === 201);

            if (successResponses.length === intervalos.length) {
                toast('Disponibilidades creadas exitosamente!', { icon: '👏', position: "top-right" });

            } else {
                toast.error("Error al crear disponibilidades.", { position: "top-right" });

            }
        } catch (error) {
            console.error("Error:", error);
            toast.error("Error al crear disponibilidades.", { position: "top-right" });
        }
    };

    return (
        <div className="contenido container">
            <h1 className="text-center text-title text-secondary pb-4">
                Disponibilidad
            </h1>
            <div className="row">
                <div className="col-sm-12 col-md-6 d-flex justify-content-center">
                    <div className="mb-3">
                        <Calendar
                            onClickDay={setFechaSeleccionada}
                            value={fechaSeleccionada}
                            minDate={minDate}
                            maxDate={maxDate}
                        />
                    </div>
                </div>
                <div className="col-md-6">
                    <h2 className="text-center text-title text-secondary pb-4">
                        Datos de disponibilidad
                    </h2>
                    <div className="row mb-4">
                        <div className="col-6">
                            <label className="form-label" htmlFor="start-time">
                                Hora de inicio
                            </label>
                            <input
                                type="time"
                                className="form-control"
                                id="start-time"
                                name="start-time"
                                min="00:00"
                                max="23:00"
                                value={startTime}
                                onChange={(e) => setStartTime(e.target.value)}
                            />
                        </div>
                        <div className="col-6">
                            <label className="form-label" htmlFor="end-time">
                                Hora de fin
                            </label>
                            <input
                                type="time"
                                className="form-control"
                                id="end-time"
                                name="end-time"
                                min="00:00"
                                max="23:00"
                                value={endTime}
                                onChange={(e) => setEndTime(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="row align-items-center">
                        <div className="col-3">
                            <label className="form-label" htmlFor="duration">
                                Duración de la cita en minutos
                            </label>
                            <input
                                type="number"
                                className="form-control"
                                id="duration"
                                name="duration"
                                min="30"
                                max="120"
                                value={duration}
                                onChange={(e) => setDuration(Number(e.target.value))}
                            />
                        </div>
                        <div className="col-9">
                            <div className="row">
                                <label className="form-label" htmlFor="duration">
                                    Modalidades de atención
                                </label>
                                <div className="col">
                                    <div className="form-check form-check-inline">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            id="remote"
                                            name="remote"
                                            onChange={(e) => setIsRemote(e.target.checked)}
                                        />
                                        <label className="form-check-label" htmlFor="remote">
                                            Remoto
                                        </label>
                                    </div>
                                    <div className="col">
                                        <div className="form-check form-check-inline">
                                            <input
                                                className="form-check-input"
                                                type="checkbox"
                                                id="presential"
                                                name="presential"
                                                onChange={(e) => setIsPresential(e.target.checked)}
                                            />
                                            <label className="form-check-label" htmlFor="presential">
                                                Presencial
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="row">
                                        <div className="col">
                                            <div className="form-check form-check-inline">
                                                <input
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    id="weekly"
                                                    name="weekly"
                                                    onChange={(e) => setIsWeekly(e.target.checked)}
                                                />
                                                <label className="form-check-label" htmlFor="weekly">
                                                    Semanal
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="container d-flex justify-content-center">
                        <button
                            type="button"
                            className="btn bg-primary text-white"
                            onClick={handleConfirmar}
                        >
                            Confirmar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
