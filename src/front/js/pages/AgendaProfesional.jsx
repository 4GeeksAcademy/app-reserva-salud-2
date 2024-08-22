import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useParams } from 'react-router-dom';
import { backendApi } from '../store/flux';


export const AgendaProfesional = () => {
    const { id } = useParams();
    const [professional, setProfessional] = useState(null);

    const getAllRecurrentDates = () => {
        return professional?.availabilities.map(availability => availability?.recurrent_dates).flat();
    };

    const getAllDates = () => {
        const recurrentDates = getAllRecurrentDates();
        const dates = professional?.availabilities.map(availability => availability?.date).flat();
        return [...dates, ...recurrentDates];
    };

    const tilesDisabled = ({ date, view }) => {
        const recurrentDates = getAllRecurrentDates();
        const dateToCompare = date.toISOString().split('T')[0];
        return view === 'month' && !getAllDates().includes(dateToCompare);
    };

    useEffect(() => {
        const getProfessional = async () => {
            try {
                const response = await backendApi.get(`/professionals/${id}/availabilities`);
                console.log(response)
                const { data } = response
                setProfessional(data);
            } catch (error) {
                console.log(error);
            }
        }
        getProfessional();
    }, []);

    console.log(professional);

    return (
        <div className="contenido">
            <h1 className="text-center text-title text-secondary">Agenda de Nombre Apellido</h1>
            <div className="row">
                <div className="col-sm-12 col-md-6 d-flex justify-content-center">
                    <img className="img-fluid max-w-50" src="https://img.freepik.com/free-vector/businessman-planning-events-deadlines-agenda_74855-6274.jpg?semt=ais_hybrid" alt="Illustration" />
                </div>
                <div className="col-sm-12 col-md-6 d-flex justify-content-center p-5">
                    {
                        professional && (
                            <Calendar tileDisabled={tilesDisabled} />
                        )
                    }
                </div>
            </div>
        </div>
    )
}