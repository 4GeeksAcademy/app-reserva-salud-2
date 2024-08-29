import React, { useContext, useEffect, useState } from "react";
import { TarjetaCitasProfesional } from "../component/TarjetaCitasProfesional.jsx";
import { backendApi } from "../store/flux.js";
import { Context } from "../store/appContext.js";

const citas = [

    {
        id: "3",
        fotoprofesional: "https://avatar.iran.liara.run/public/boy",
        dia: "5 de setiembre",
        hora: "10:30",
        modalidad: "Virtual",
        profesional: "Carlos Villar",
        especialidad: "odontólogo"
    },
    {
        id: "1",
        fotoprofesional: "https://avatar.iran.liara.run/public/girl",
        dia: "10 de agosto",
        hora: "9:30",
        modalidad: "Presencial",
        profesional: "Juana Pérez",
        especialidad: "nutricionista"
    },

]

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

    console.log(professionalAppointments);

    return (
        <div className="contenido">
            <h1 className="text-title text-secondary text-center p-4 m-4">Bienvenido, Nombre Profesional</h1>
            <div className="d-flex justify-content-center">
                <h3 className="text-subtitle mx-3 w-75">Pacientes agendados</h3>
            </div>
            <div>
                {professionalAppointments.map((appointment) => (
                    <TarjetaCitasProfesional key={appointment.id} appointment={appointment} />))}
            </div>
        </div>
    )
};