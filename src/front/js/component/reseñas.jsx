import React from "react";
import "../../styles/home.css";

export const Valoraciones = () => {
    return (
        <div className="container-fluid bg-gray m-2 shadow-md">
            <div className="row">
            <p className="col fw-bold">Nombre Paciente</p>
            <p className=" col text-end pe-3 text-secondary"><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i></p>
            </div>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia quis voluptatum consequuntur culpa esse iste placeat repellat enim.</p>
        </div>
    )
}