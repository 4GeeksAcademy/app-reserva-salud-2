import React, { useState } from "react";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

export const DisponibilidadProfesional = () => {
    const [fechaSeleccionada, setFechaSeleccionada] = useState(new Date());
    const [horasSeleccionadas, setHorasSeleccionadas] = useState([]);

    const handleClicHora = (hora) => {
        setHorasSeleccionadas((horasActuales) =>
            horasActuales.includes(hora)
                ? horasActuales.filter((horaSeleccionada) => horaSeleccionada !== hora)
                : [...horasActuales, hora]
        );
    };

    return (
        <div className="contenido">
            <h1 className="text-center text-title text-secondary pb-4">Disponibilidad</h1>
            <div className="row">
                <div className="col-sm-12 col-md-6 d-flex justify-content-end">
                    <div className="mb-3">
                        <Calendar onChange={setFechaSeleccionada} value={fechaSeleccionada} />
                    </div>
                </div>
                <div className="col-sm-12 col-md-6">
                <div className="container" style={{ height: '270px', overflowY: 'scroll' }}>
                    <div className="flex-column" >
                        <button
                            className={`btn w-50 ${horasSeleccionadas.includes('08:00') ? 'bg-primary text-white' : 'btn-outline-primary'} mb-2`}
                            onClick={() => handleClicHora('08:00')}>
                            08:00
                        </button>
                    </div>
                    <div className="flex-column">
                        <button
                            className={`btn w-50 ${horasSeleccionadas.includes('08:30') ? 'bg-primary text-white' : 'btn-outline-primary'} mb-2`}
                            onClick={() => handleClicHora('08:30')}>
                            08:30
                        </button>
                    </div>
                    <div className="flex-column">
                        <button
                            className={`btn w-50 ${horasSeleccionadas.includes('09:00') ? 'bg-primary text-white' : 'btn-outline-primary'} mb-2`}
                            onClick={() => handleClicHora('09:00')}>
                            09:00
                        </button>
                    </div>
                    <div className="flex-column">
                        <button
                            className={`btn w-50 ${horasSeleccionadas.includes('09:30') ? 'bg-primary text-white' : 'btn-outline-primary'} mb-2`}
                            onClick={() => handleClicHora('09:30')}>
                            09:30
                        </button>
                    </div>
                    <div className="flex-column">
                        <button
                            className={`btn w-50 ${horasSeleccionadas.includes('10:00') ? 'bg-primary text-white' : 'btn-outline-primary'} mb-2`}
                            onClick={() => handleClicHora('10:00')}>
                            10:00
                        </button>
                    </div>
                    <div className="flex-column">
                        <button
                            className={`btn w-50 ${horasSeleccionadas.includes('10:30') ? 'bg-primary text-white' : 'btn-outline-primary'} mb-2`}
                            onClick={() => handleClicHora('10:30')}>
                            10:30
                        </button>
                    </div>
                    <div className="flex-column">
                        <button
                            className={`btn w-50 ${horasSeleccionadas.includes('11:00') ? 'bg-primary text-white' : 'btn-outline-primary'} mb-2`}
                            onClick={() => handleClicHora('11:00')}>
                            11:00
                        </button>
                    </div>
                    <div className="flex-column">
                        <button
                            className={`btn w-50 ${horasSeleccionadas.includes('11:30') ? 'bg-primary text-white' : 'btn-outline-primary'} mb-2`}
                            onClick={() => handleClicHora('11:30')}>
                            11:30
                        </button>
                    </div>
                    <div className="flex-column">
                        <button
                            className={`btn w-50 ${horasSeleccionadas.includes('12:00') ? 'bg-primary text-white' : 'btn-outline-primary'} mb-2`}
                            onClick={() => handleClicHora('12:00')}>
                            12:00
                        </button>
                    </div>
                    <div className="flex-column">
                        <button
                            className={`btn w-50 ${horasSeleccionadas.includes('12:30') ? 'bg-primary text-white' : 'btn-outline-primary'} mb-2`}
                            onClick={() => handleClicHora('12:30')}>
                            12:30
                        </button>
                    </div>
                    <div className="flex-column">
                        <button
                            className={`btn w-50 ${horasSeleccionadas.includes('13:00') ? 'bg-primary text-white' : 'btn-outline-primary'} mb-2`}
                            onClick={() => handleClicHora('13:00')}>
                            13:00
                        </button>
                    </div>
                    <div className="flex-column">
                        <button
                            className={`btn w-50 ${horasSeleccionadas.includes('13:30') ? 'bg-primary text-white' : 'btn-outline-primary'} mb-2`}
                            onClick={() => handleClicHora('13:30')}>
                            13:30
                        </button>
                    </div>
                    <div className="flex-column">
                        <button
                            className={`btn w-50 ${horasSeleccionadas.includes('14:00') ? 'bg-primary text-white' : 'btn-outline-primary'} mb-2`}
                            onClick={() => handleClicHora('14:00')}>
                            14:00
                        </button>
                    </div>
                    <div className="flex-column">
                        <button
                            className={`btn w-50 ${horasSeleccionadas.includes('14:30') ? 'bg-primary text-white' : 'btn-outline-primary'} mb-2`}
                            onClick={() => handleClicHora('14:30')}>
                            14:30
                        </button>
                    </div>
                    <div className="flex-column">
                        <button
                            className={`btn w-50 ${horasSeleccionadas.includes('15:00') ? 'bg-primary text-white' : 'btn-outline-primary'} mb-2`}
                            onClick={() => handleClicHora('15:00')}>
                            15:00
                        </button>
                    </div>
                    <div className="flex-column">
                        <button
                            className={`btn w-50 ${horasSeleccionadas.includes('15:30') ? 'bg-primary text-white' : 'btn-outline-primary'} mb-2`}
                            onClick={() => handleClicHora('15:30')}>
                            15:30
                        </button>
                    </div>
                    <div className="flex-column">
                        <button
                            className={`btn w-50 ${horasSeleccionadas.includes('16:00') ? 'bg-primary text-white' : 'btn-outline-primary'} mb-2`}
                            onClick={() => handleClicHora('16:00')}>
                            16:00
                        </button>
                    </div>
                    <div className="flex-column">
                        <button
                            className={`btn w-50 ${horasSeleccionadas.includes('16:30') ? 'bg-primary text-white' : 'btn-outline-primary'} mb-2`}
                            onClick={() => handleClicHora('16:30')}>
                            16:30
                        </button>
                    </div>
                    <div className="flex-column">
                        <button
                            className={`btn w-50 ${horasSeleccionadas.includes('17:00') ? 'bg-primary text-white' : 'btn-outline-primary'} mb-2`}
                            onClick={() => handleClicHora('17:00')}>
                            17:00
                        </button>
                    </div>
                    <div className="flex-column">
                        <button
                            className={`btn w-50 ${horasSeleccionadas.includes('17:30') ? 'bg-primary text-white' : 'btn-outline-primary'} mb-2`}
                            onClick={() => handleClicHora('17:30')}>
                            17:30
                        </button>
                    </div>
                    <div className="flex-column">
                        <button
                            className={`btn w-50 ${horasSeleccionadas.includes('18:00') ? 'bg-primary text-white' : 'btn-outline-primary'} mb-2`}
                            onClick={() => handleClicHora('18:00')}>
                            18:00
                        </button>
                    </div>
                    <div className="flex-column">
                        <button
                            className={`btn w-50 ${horasSeleccionadas.includes('18:30') ? 'bg-primary text-white' : 'btn-outline-primary'} mb-2`}
                            onClick={() => handleClicHora('18:30')}>
                            18:30
                        </button>
                    </div>
                    <div className="flex-column">
                        <button
                            className={`btn w-50 ${horasSeleccionadas.includes('19:00') ? 'bg-primary text-white' : 'btn-outline-primary'} mb-2`}
                            onClick={() => handleClicHora('19:00')}>
                            19:00
                        </button>
                    </div>
                    <div className="flex-column">
                        <button
                            className={`btn w-50 ${horasSeleccionadas.includes('19:30') ? 'bg-primary text-white' : 'btn-outline-primary'} mb-2`}
                            onClick={() => handleClicHora('19:30')}>
                            19:30
                        </button>
                    </div>
                    <div className="flex-column">
                        <button
                            className={`btn w-50 ${horasSeleccionadas.includes('20:00') ? 'bg-primary text-white' : 'btn-outline-primary'} mb-2`}
                            onClick={() => handleClicHora('20:00')}>
                            20:00
                        </button>
                    </div>
                    <div className="flex-column">
                        <button
                            className={`btn w-50 ${horasSeleccionadas.includes('20:30') ? 'bg-primary text-white' : 'btn-outline-primary'} mb-2`}
                            onClick={() => handleClicHora('20:30')}>
                            20:30
                        </button>
                    </div>
                    <div className="flex-column">
                        <button
                            className={`btn w-50 ${horasSeleccionadas.includes('21:00') ? 'bg-primary text-white' : 'btn-outline-primary'} mb-2`}
                            onClick={() => handleClicHora('21:00')}>
                            21:00
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <div className="container d-flex justify-content-center">
        <button type="submit" className="btn bg-primary text-white">
             Confirmar
        </button>
        </div>
        </div>
    );
};
