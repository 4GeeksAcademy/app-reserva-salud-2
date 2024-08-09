import React from "react";
import { Link } from "react-router-dom";

export const VistaPago = () => {
    return (
        <div className="contenido mb-5">
            <h1 className="text-center text-title text-primary">Confirmar reserva</h1>
            <h6 className="text-subtitle text-secondary mt-3">Cita acordada:</h6>
            <div className="container bg-gray">
                <p className="text-label">Día y hora:</p>
                <p className="text-label">Profesional:</p>
                <p className="text-label">Modalidad: </p>
            </div>
            <h6 className="text-subtitle text-secondary mt-3">Seleccione un método de pago</h6>
            <select className="form-select my-3" id="pago" name="pago">
                        <option value="" label="Seleccione un método de pago" />
                        <option value="tarjeta" label="Tarjeta de crédito o débito" />
                        <option value="redcobranza" label="Abitab o Redpagos" />
                    </select>
            <div className="d-flex justify-content-center">
                <Link to="/" className="btn bg-primary text-white"><i class="fa-solid fa-calendar-check"></i>Confirmar</Link>
            </div>
        </div>
    )
};