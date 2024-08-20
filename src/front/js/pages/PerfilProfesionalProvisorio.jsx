import React from "react";
import { TarjetaCitasProfesional } from "../component/TarjetaCitasProfesional.jsx";

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

    return (
        <div className="contenido">
                <h1 className="text-title text-secondary text-center p-4 m-4">Bienvenido, Nombre Profesional</h1>
            <div className="d-flex justify-content-center">
                <h3 className="text-subtitle mx-3 w-75">Pacientes agendados</h3>
            </div>
            <div>
                {citas.map((citas) => (
                    <TarjetaCitasProfesional key={citas.id} citas={citas} />))}
            </div>
        </div>
    )
};