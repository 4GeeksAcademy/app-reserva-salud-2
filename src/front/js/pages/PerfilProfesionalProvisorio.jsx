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
                    professionalAppointments.length > 0 ?
                        professionalAppointments?.map((appointment) => (
                            <TarjetaCitasProfesional key={appointment.id} appointment={appointment} />
                        )) : (
                            <div role="alert" className="alert col-span-2">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    className="stroke-info h-6 w-6 shrink-0">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                </svg>
                                <span>Aún no tienes pacientes agendados</span>
                            </div>
                        )
                }
            </div>
        </div>
    )
};