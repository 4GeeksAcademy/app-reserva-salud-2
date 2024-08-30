
import React from "react";

export const EditarPerfilProfesional = () => {
    return (
        <div className="contenido">
            <h1 className="text-center text-primary text-title pt-5 pb-2">Mi perfil</h1>
            <h4 className="text-center text-subtitle pb-5">Agrega y edita la información que se mostrará a los pacientes</h4>
            <div className="d-flex justify-content-center">
                <form className="w-75">
                    <div className="mb-3">
                        <label for="nombre" className="text-label">Nombre</label>
                        <input type="text" className="form-control" id="nombre" aria-describedby="nombre" />
                    </div>
                    <div className="mb-3">
                        <label for="apellido" className="text-label">Apellido</label>
                        <input type="text" className="form-control" id="apellido" aria-describedby="apellido" />
                    </div>
                    <div className="mb-3">
                        <label for="link" className="text-label">Enlace para consultas remotas</label>
                        <input type="link" className="form-control" id="link" aria-describedby="link" />
                    </div>
                    <div className="mb-3">
                        <label for="descripcion" className="text-label">Descripción</label>
                        <textarea type="text" className="form-control" id="descripcion" aria-describedby="descripcion" />
                    </div>
                    <div className="mb-3 text-center">
                    <button type="submit" className="btn btn-primary">Guardar Cambios</button>
                    </div>
                </form>
            </div>
        </div>
    )
}