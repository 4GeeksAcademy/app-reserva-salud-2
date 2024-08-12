import React from "react";
import { DescripcionProfesional } from "../component/descripcion-profesional.jsx";
import { Valoraciones } from "../component/reseñas.jsx"; 
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

export const VistaInfoProfesional = () => {
    const { id } = useParams();

    return (
        <div className="contenido mb-5">
            <DescripcionProfesional id={id} />
            <Valoraciones />
            <div>
                <h6 className="text-normal text-secondary fw-bold py-3 px-2">Modalidad de la consulta</h6>
                <div className="container">
                    <form>
                        <div className="mb-3" role="group">
                            <div className="form-check d-flex justify-content-between align-items-center">
                                <div>
                                    <input 
                                        type="radio" name="modalidad" className="form-check-input" id="remoto"
                                    />
                                    <label className="form-check-label text-label" htmlFor="remoto">
                                        <i className="fa-solid fa-laptop-medical text-secondary"></i> Remoto
                                    </label>
                                </div>
                                <p className="text-secondary mb-0 fw-bold">$ Precio</p>
                            </div>
                            <div className="form-check d-flex justify-content-between align-items-center">
                                <div>
                                    <input 
                                        type="radio" name="modalidad" className="form-check-input" id="presencial"
                                    />
                                    <label className="form-check-label text-label" htmlFor="presencial">
                                        <i className="fa-solid fa-house-medical text-secondary"></i> Presencial
                                    </label>
                                </div>
                                <p className="text-secondary mb-0 fw-bold">$ Precio</p>
                            </div>
                        </div>
                        <div className="d-flex justify-content-center">
                        </div>
                    </form>
                </div>
            </div>

            <div className="d-flex justify-content-center">
                <Link to="/agenda-profesional" className="btn bg-primary text-white"><i className="fa-sharp fa-solid fa-calendar-days"></i> Ver agenda de este profesional</Link>
            </div>
        </div>
    )
};
