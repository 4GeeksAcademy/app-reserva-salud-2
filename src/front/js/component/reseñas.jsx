import React from "react";
import "../../styles/home.css";

export const Valoraciones = () => {
    const ejemplo = {
        nombre: "Gonzalo",
        apellido: "González",
        comentario: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aut voluptatum, optio veniam repellendus totam cumque? Id rerum, nobis numquam excepturi dolore adipisci ea illo tempore eum optio sapiente, molestias officiis! Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam commodi modi aspernatur itaque, aliquid minus odit et adipisci facilis temporibus ducimus corporis molestiae nemo excepturi.",
      };
    return (
<div className="d-flex justify-content-center pb-5">
    <div className="container bg-gray mx-3 shadow-md w-75">
        <div className="row">
            <p className="col fw-bold">{ejemplo.nombre} {ejemplo.apellido} </p>
            <p className="col text-end pe-3 text-secondary">
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
            </p>
        </div>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia quis voluptatum consequuntur culpa esse iste placeat repellat enim.</p>
    </div>
</div>

    )
}