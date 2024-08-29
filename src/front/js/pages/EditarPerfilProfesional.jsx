import React from "react";

export const EditarPerfilProfesional = () => {
    return (
        <div className="contenido">
            <h1 className="text-center text-primary text-title">Mi perfil</h1>
            <h4 className="text-center text-subtitle">Agrega y edita la información que se mostrará a los pacientes</h4>
            <form>
                <div class="mb-3">
                    <label for="nombre" class="form-label">Nombre</label>
                    <input type="text" class="form-control" id="nombre" aria-describedby="nombre"/>
                </div>
                <div class="mb-3">
                    <label for="apellido" class="form-label">Apellido</label>
                    <input type="text" class="form-control" id="apellido" aria-describedby="apellido"/>
                </div>
                <div class="mb-3">
                    <label for="nombre" class="form-label">Enlace para consultas</label>
                    <input type="link" class="form-control" id="nombre" aria-describedby="nombre"/>
                </div>
                <div class="mb-3">
                    <label for="nombre" class="form-label">Descripción</label>
                    <input type="text" class="form-control" id="nombre" aria-describedby="nombre"/>
                </div>
            </form>
        </div>
    )
}