import React from "react";
import { Link } from "react-router-dom";

export const VistaPago = () => {
    return (
        <div className="contenido mb-5">
            <h6 className="text-center text">Confirmar y pagar</h6>
            <p>Acá va la confirmación de la cita</p>
            <p>Acá van el formulario de pago</p>
            <div className="d-flex justify-content-center">
                <Link to="/" className="btn bg-primary text-white"><i class="fa-solid fa-calendar-check"></i>Confirmar</Link>
            </div>
        </div>
    )
};