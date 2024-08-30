import React, { useContext, useEffect, useState } from "react";
import { TarjetaCitasProfesional } from "../component/TarjetaCitasProfesional.jsx";
import { backendApi } from "../store/flux.js";
import { Context } from "../store/appContext.js";
import { Link } from "react-router-dom";

export const VistaPerfilProfesional = () => {
    const { store, actions } = useContext(Context);
    const [professionalAppointments, setProfessionalAppointments] = useState([]);

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
            <div className="d-flex justify-content-center">
            <div className="row py-4 w-75">
                <div className="col-md-8">
                    <h1 className="text-title text-secondary text-center">Bienvenido</h1>
                </div>
                <div className="col text-center">
                    <Link to={"/editar-perfil"} className="btn text-btn text-primary bg-gray">
                        <i class="fa-solid fa-pencil"></i>  Editar perfil
                    </Link>
                </div>
                </div>

            </div>
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