import React from "react";
import "../../styles/home.css";


export const DescripcionProfesional = () => {
    return (
        <div className="container contenido">
            <img src="https://picsum.photos/100/100?random=1" class="rounded-circle mx-auto d-block w-5" alt="..."></img>
            <h1 className="text-title text-center text-primary">Nombre</h1>
            <h1 className="text-title text-center text-primary">Apellido</h1>

            <h3 className="text-subtitle text-center">Especialidad</h3>
            <h5 className="text-normal text-center fw-semibold">Ciudad, departamento</h5>
            <hr />
            <div className="row mt-3 d-flex justify-content-center">
                <div className="col text-center">
                    <h6>Calificación</h6>
                    <p className="text-secondary"><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i></p>
                </div>
                <div className="col text-center">
                    <h6>Calificación</h6>
                    <p className="text-secondary fw-bold">Num</p>
                </div>
                <hr />
                <div>
                    <h6 className="text-center text-subtitle">Descripción</h6>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam commodi modi aspernatur itaque, aliquid minus odit et adipisci facilis temporibus ducimus corporis molestiae nemo excepturi.</p>
                </div>
                <div>
                    <h6 className="text-center text-subtitle">Reseñas</h6>
                </div>
            </div>
            </div>
            )
}