import React from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

export const AgendaProfesional = () => {

    return (
        <div className="contenido">
            <h1 className="text-center text-title text-secondary">Agenda de Nombre Apellido</h1>
            <div className="row">
                <div className="col-sm-12 col-md-6 d-flex justify-content-center">
                    <img className="img-fluid max-w-50" src="https://img.freepik.com/free-vector/businessman-planning-events-deadlines-agenda_74855-6274.jpg?semt=ais_hybrid" alt="Illustration" />
                </div>
                <div className="col-sm-12 col-md-6 d-flex justify-content-center p-5">
                    <Calendar />
                </div>
            </div>
        </div>
    )
}