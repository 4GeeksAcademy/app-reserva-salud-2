import React from "react";
import { DescripcionProfesional } from "../component/descripcion-profesional.jsx";
import { Valoraciones } from "../component/reseñas.jsx"; 
import { Link } from "react-router-dom";

export const VistaInfoProfesional = () => {
    return (
        <div className="contenido mb-5">
            <DescripcionProfesional/>
            <h6 className="text-center text"></h6>
            <Valoraciones/>
            <div className="d-flex justify-content-center">
                <Link to="/agenda-profesional" className="btn bg-primary text-white"><i className="fa-sharp fa-solid fa-calendar-days"></i> Ver agenda de este profesional</Link>
            </div>
        </div>
    )
};