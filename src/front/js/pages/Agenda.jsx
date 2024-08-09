import React from "react";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Link } from "react-router-dom";

export const VistaAgendaProfesional = () => {
    const formik = useFormik({
        initialValues: {
            modalidad: [],
        },
        validationSchema: Yup.object({
            modalidad: Yup.array()
            .required('Debe seleccionar una modalidad')
            .min(1, 'Debe seleccionar una modalidad'),
        }),
        onSubmit: values => {
            console.log(values);
        },
    });


    return (
        <div className="contenido mb-5">
            <h6 className="text-center text-title text-secondary">Agenda de Juan Pérez, nutricionista</h6>
            <div>
                <p className="text-normal fw-bold pt-3">Seleccione el día y horario para su cita</p>
                <p>Acá va la agenda</p>
            </div>
            <div>
                <h6 className="text-normal text-secondary fw-bold py-3">Modalidad de la consulta</h6>
                <div className="container">
                    <form>
                    <div className="mb-3" role="group">
                    <div className="form-check">
                    <p className="col fw-bold ms-2"><i class="fa-solid fa-laptop-medical text-secondary"></i> Remoto</p>
                            <p className=" col text-secondary">$ Precio</p>
                        <input type="checkbox" name="modalidad" className="form-check-input" id="remoto"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value="Remoto"
                            checked={formik.values.modalidad.includes("Remoto")} />
                            
                    </div>
                    <div className="form-check">
                    <div className="row">
                            <p className="col fw-bold ms-2"><i className="fa-solid fa-house-medical text-secondary"></i> Presencial</p>
                            <p className=" col text-secondary">$ Precio</p>
                            <input type="checkbox" name="modalidad" className="form-check-input" id="presencial"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value="Presencial"
                            checked={formik.values.modalidad.includes("Presencial")} />
                            {formik.touched.modalidad && formik.errors.modalidad ? (
                        <div className="text-primary">{formik.errors.modalidad}</div>
                    ) : null}
                        </div>

                    </div>
                    
                </div>
                      
                        <div className="row">
                        </div>
                    </form>
                </div>

            </div>
            <div className="d-flex justify-content-center">
                <Link to="/pago" className="btn bg-primary text-white"><i class="fa-solid fa-calendar-check"></i>Confirmar</Link>
            </div>
        </div>
    )
};