import React from "react";
import "../../styles/home.css";

export const DescripcionProfesional = () => {
    const ejemplo = {
        nombre: "Juan",
        apellido: "Pérez",
        especialidad: "Nutricionista",
        departamento: "Canelones",
        ciudad: "Atlántida",
        descripcion: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aut voluptatum, optio veniam repellendus totam cumque? Id rerum, nobis numquam excepturi dolore adipisci ea illo tempore eum optio sapiente, molestias officiis! Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam commodi modi aspernatur itaque, aliquid minus odit et adipisci facilis temporibus ducimus corporis molestiae nemo excepturi.",
      };

    return (
        <div className="container contenido">
            <img src="https://picsum.photos/100/100?random=1" class="rounded-circle mx-auto d-block w-5" alt="..."></img>
            <h1 className="text-title text-center text-primary">{ejemplo.nombre}</h1>
            <h1 className="text-title text-center text-primary">{ejemplo.apellido}</h1>

            <h3 className="text-subtitle text-center">{ejemplo.especialidad}</h3>
            <h5 className="text-normal text-center fw-semibold">{ejemplo.ciudad}, {ejemplo.departamento}</h5>
            <hr />
            <div className="row mt-3 d-flex justify-content-center">
                <div className="col text-center">
                    <h6>Calificación</h6>
                    <p className="text-secondary"><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i></p>
                </div>
                <div className="col text-center">
                    <h6>Reseñas</h6>
                    <p className="text-secondary fw-bold">1</p>
                </div>
                <hr />
                <div>
                    <h6 className="text-center text-subtitle">Descripción</h6>
                    <p className="px-2">{ejemplo.descripcion}</p>
                </div>
                <div>
                    <h6 className="text-center text-subtitle pt-3">Reseñas</h6>
                </div>
            </div>
            </div>
            )
}