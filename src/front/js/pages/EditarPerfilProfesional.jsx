import React from "react";
import { useNavigate } from 'react-router-dom';

export const EditarPerfilProfesional = () => {
    const navigate = useNavigate();

    return (
        <div className="contenido">
            <h1 className="text-title text-center text-primary">Modifica tu perfil</h1>
            <h3 className="text-subtitle text-center">Ingresa la información que los pacientes verán sobre ti</h3>
            <form className="form">
                <div className="mb-3">
                    <label for="exampleInputEmail1" className="form-label">Nombre</label>
                    <p></p>
                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <label for="exampleInputEmail1" className="form-label">Apellido</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <label for="floatingTextarea2">Descripción</label>
                    <textarea className="form-control" placeholder="Añade la descripción de tu servicio" id="floatingTextarea2" style={{ height: "100px" }}></textarea>
                </div>
                <button type="submit" className="btn btn-primary">Guardar cambios</button>
            </form>
        </div>
    )
}