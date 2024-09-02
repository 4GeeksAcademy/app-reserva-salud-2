import React, { useContext, useEffect, useState } from "react";
import { TarjetaCitasProfesional } from "../component/TarjetaCitasProfesional.jsx";
import { Context } from "../store/appContext.js";

export const VistaPerfilProfesional = ({ professional }) => {
    const [professionalAppointments, setProfessionalAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const { actions, store } = useContext(Context);

    useEffect(() => {
        const getProfessionalAppointments = async () => {
            const response = await actions.getProfessionalAppointments()
            setProfessionalAppointments(response.data)
            setLoading(false)
        }
        getProfessionalAppointments();
    }, []);

    if (loading) {
        return (
            <div className="container mx-auto min-h-screen pt-20">
                <div className="flex justify-center mb-8">
                    <div className="skeleton h-10 w-96"></div>
                </div>
                <div className="flex justify-center">
                    <div className="skeleton h-6 w-64"></div>
                </div>
                <div className="grid sm:grid-cols-2 gap-6 mt-10">
                    <div className="skeleton h-40 w-full"></div>
                    <div className="skeleton h-40 w-full"></div>
                    <div className="skeleton h-40 w-full"></div>
                    <div className="skeleton h-40 w-full"></div>
                </div>
            </div>
        )
    }

    return (
        <div className="container mx-auto min-h-screen pt-20">
            <h2 className="mb-8 text-4xl font-bold text-center">Bienvenido {store?.currentProfessional?.first_name} {store?.currentProfessional?.last_name}</h2>
            <div className="flex justify-center">
                <h3 className="text-2xl font-medium">Pacientes agendados</h3>
            </div>
            <div className="grid sm:grid-cols-2 gap-6 mt-10">
                {
                    professionalAppointments?.map((appointment) => (
                        <TarjetaCitasProfesional key={appointment.id} appointment={appointment} />
                    ))
                }
            </div>
        </div>
    )
};