import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useParams } from 'react-router-dom';
import { backendApi } from '../store/flux';
import PaymentBrick from '../component/PaymentBrick.jsx';


export const AgendaProfesional = () => {
    const { id } = useParams();
    const [professional, setProfessional] = useState(null);
    const [selectedDate, setSelectedDate] = useState(null);
    const [availableIntervals, setAvailableIntervals] = useState([]);
    const [selectedInterval, setSelectedInterval] = useState(null);
    const [showCheckout, setShowCheckout] = useState(false);
    const [amount, setAmount]= useState('');

    const handleCheckoutClick = () => {
        setShowCheckout(true);
    };

    useEffect(() => {
        const getProfessional = async () => {
            try {
                const response = await backendApi.get(`/professionals/${id}/availabilities`);
                setProfessional(response.data);
            } catch (error) {
                console.log(error);
            }
        }
        getProfessional();
    }, [id]);

    const generateIntervals = (startTime, endTime) => {
        const intervals = [];
        let start = new Date(`1970-01-01T${startTime}:00`);
        const end = new Date(`1970-01-01T${endTime}:00`);

        while (start < end) {
            const endInterval = new Date(start.getTime() + 30 * 60000); // 30 minutos
            intervals.push(`${start.toTimeString().substr(0, 5)} - ${endInterval.toTimeString().substr(0, 5)}`);
            start = endInterval;
        }

        return intervals;
    };

    const handleDayClick = (date) => {
        setSelectedDate(date);
        const dateToCompare = date.toISOString().split('T')[0];
        const availabilities = professional?.availabilities
            .filter(availability => availability.date === dateToCompare || availability.recurrent_dates?.includes(dateToCompare));

        const intervals = availabilities
            .map(availability => generateIntervals(availability.start_time, availability.end_time))
            .flat();

        setAvailableIntervals(intervals);
    };

    const tilesDisabled = ({ date, view }) => {
        const recurrentDates = professional?.availabilities.map(availability => availability.recurrent_dates).flat();
        const dateToCompare = date.toISOString().split('T')[0];
        return view === 'month' && !professional?.availabilities.some(availability => availability.date === dateToCompare || recurrentDates.includes(dateToCompare));
    };

    const handleIntervalClick = (interval) => {
        console.log(interval)
    };

    console.log(professional);

    const handleRefundReservation = async () => {
        try {
            const response = await fetch('https://verbose-space-orbit-q5wjv57g6gvh965-3001.app.github.dev/api/refund_payment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    professional_id: 'id' // envío id profesional,falta id cita
                }),
            });

            const data = await response.json();

            if (response.ok) {
                alert('Reserva cancelada y reembolso procesado exitosamente.');
            } else {
                alert('Error al cancelar la reserva: ' + data.error);
            }
        } catch (error) {
            console.error('Error al cancelar la reserva:', error);
        }
    };
    
    return (
        <div className="contenido">
            <h1 className="text-center text-title text-secondary">Agenda de {(professional?.first_name + " " + professional?.last_name) || professional?.email}</h1>
            <div className="row">
                <div className="col-sm-12 col-md-6 d-flex justify-content-center">
                    <img className="img-fluid max-w-50" src="https://img.freepik.com/free-vector/businessman-planning-events-deadlines-agenda_74855-6274.jpg?semt=ais_hybrid" alt="Illustration" />
                </div>
                <div className="col-sm-12 col-md-6 d-flex justify-content-center p-5">
                    {
                        professional && (
                            <Calendar tileDisabled={tilesDisabled} onClickDay={handleDayClick} />
                        )
                    }
                </div>
                <div className="row">
                <div className="col-md-5">
                </div>
                <div className="col-md-7">
                <input type="number" step="0.01"value={amount} onChange={(event) => setAmount(event.target.value)} 
                placeholder="Ingrese el monto" className="form-control mb-2 w-50"
                 />
                </div>
                
                </div>    
                    <div className="d-flex justify-content-center ">
                    <button className="btn btn-primary w-25 text-white" onClick={handleCheckoutClick}> Reservar 
                    </button>
                    <button className="btn btn-primary w-25 text-white" onClick={handleCheckoutClick}> Cancelar Reserva 
                    </button>
                    </div>
                    {showCheckout && <PaymentBrick 
                                        amount={amount}
                                        id_profesional={id}                
                                    />}
                    

            </div>
            {selectedDate && (
                <div className="mt-4">
                    <h2>Horarios disponibles para {selectedDate.toLocaleDateString(undefined, {
                        weekday: 'long',
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'
                    })}</h2>

                    {availableIntervals.length > 0 ? (
                        <div className="list-group">
                            {availableIntervals.map((interval, index) => (
                                <button
                                    key={index}
                                    className={`list-group-item list-group-item-action ${selectedInterval === interval ? 'active' : ''}`}
                                    onClick={() => handleIntervalClick(interval)}
                                >
                                    {interval}
                                </button>
                            ))}
                        </div>
                    ) : (
                        <div className="list-group-item">No hay horarios disponibles</div>
                    )}

                </div>
            )}
        </div>
    );
};