import React from "react";
import { Calendly } from "../component/calendly.jsx";

export const VistaAgendaProfesional = () => { 
    return (
        <div className="contenido mb-5">
            <h1 className="text-center text-title text-primary">Agenda de Nombre Apellido</h1>
            <h2 className="text-center text-subtitle text-secondary">Especialidad</h2>
            <div>
                <p className="text-normal fw-semibold pt-4 px-2">Seleccione el día y horario para su cita: </p>
                <Calendly/>
                        <div className="d-flex justify-content-center">
                            <button type="submit" className="btn bg-primary text-white">
                                <i className="fa-solid fa-calendar-check"></i> Confirmar
                            </button>
                        </div>
                </div>
            </div>
    );
};
