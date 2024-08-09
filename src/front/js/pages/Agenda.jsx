import React from "react";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Link } from "react-router-dom";

export const VistaAgendaProfesional = () => {
    const formik = useFormik({
        initialValues: {
            modalidad: "",
        },
        validationSchema: Yup.object({
            modalidad: Yup.string()
                .required('Debe seleccionar una modalidad')
        }),
        onSubmit: values => {
            console.log(values);
            window.location.href = '/pago';  // Navegar a /pago después de enviar el formulario
        },
    });

    return (
        <div className="contenido mb-5">
            <h1 className="text-center text-title text-primary">Agenda de Juan Pérez</h1>
            <h2 className="text-center text-subtitle text-secondary">Nutricionista</h2>
            <div>
                <p className="text-normal fw-semibold pt-4 px-2">Seleccione el día y horario para su cita: </p>
                <img src="https://cdn.prod.website-files.com/5b7f24cc900973de13d7beb4/63bde3d8571e7cbd01401722_DNNOAjJ92DJwlBAm2cLtigWs9TFiO9p2zxmohakANewkA-udpzu454gxw9O011gNo5lmB68qVh8NtHHFEayXP5G6zdPD5gyr62jW6FlYFb6b5tfb2pv-h6WGNcNUfclyenZ7s7M2tZiM29JVuGWR9Wv0oaeJUCZPF9uRV-VD0oqjIPYATqc-6vMV6si9lA.png" className="img-fluid" alt="..."></img>
            </div>
            <div>
                <h6 className="text-normal text-secondary fw-bold py-3 px-2">Modalidad de la consulta</h6>
                <div className="container">
                    <form onSubmit={formik.handleSubmit}>
                        <div className="mb-3" role="group">
                            <div className="form-check d-flex justify-content-between align-items-center">
                                <div>
                                    <input 
                                        type="radio" name="modalidad" className="form-check-input" id="remoto"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value="Remoto"
                                        checked={formik.values.modalidad === "Remoto"}
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
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value="Presencial"
                                        checked={formik.values.modalidad === "Presencial"}
                                    />
                                    <label className="form-check-label text-label" htmlFor="presencial">
                                        <i className="fa-solid fa-house-medical text-secondary"></i> Presencial
                                    </label>
                                </div>
                                <p className="text-secondary mb-0 fw-bold">$ Precio</p>
                            </div>
                        </div>
                        {formik.touched.modalidad && formik.errors.modalidad ? (
                            <div className="text-primary">{formik.errors.modalidad}</div>
                        ) : null}
                        <div className="d-flex justify-content-center">
                            <button type="submit" className="btn bg-primary text-white">
                                <i className="fa-solid fa-calendar-check"></i> Confirmar
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};
