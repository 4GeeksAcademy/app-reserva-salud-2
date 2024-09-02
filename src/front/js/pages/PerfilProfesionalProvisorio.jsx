import React, { useContext, useEffect, useState } from "react";
import { TarjetaCitasProfesional } from "../component/TarjetaCitasProfesional.jsx";
import { Context } from "../store/appContext.js";

export const VistaPerfilProfesional = () => {
    const [professionalAppointments, setProfessionalAppointments] = useState([]);
    const { actions } = useContext(Context);

    useEffect(() => {
        const getProfessionalAppointments = async () => {
            const response = await actions.getProfessionalAppointments()
            setProfessionalAppointments(response.data)
        }
        getProfessionalAppointments();
    }, []);

    return (
        <div className="contenido pt-28">
            <h1 className="mb-8 text-4xl font-bold text-center">Bienvenido</h1>
            <div className="d-flex justify-content-center">
                <h3 className="text-2xl mx-8 w-75">Pacientes agendados</h3>
            </div>
            <div className="grid sm:grid-cols-2 gap-6 m-8">
                {professionalAppointments.map((appointment) => (
                    <TarjetaCitasProfesional key={appointment.id} appointment={appointment} />))}
            </div>
        </div>
    )
};