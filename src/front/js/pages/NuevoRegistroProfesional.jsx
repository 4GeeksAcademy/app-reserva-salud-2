import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { Context } from "../store/appContext";

export const VistaNuevoRegistroProfesional = () => {
    // const { actions } = useContext(Context);
    // const navigate = useNavigate();

    return (
        <>
            <Formik
                initialValues={{
                    first_name: "",
                    last_name: "",
                    birth_date: "",
                    gender: "",
                    state: "",
                    city: "",
                    specialty: "",
                    title: "",
                    photo: "",
                    phone: "",
                    calendly: "",
                    modality: ""
                }}
                validationSchema={Yup.object({
                    first_name: Yup.string().required("Este campo es obligatorio"),
                    last_name: Yup.string().required("Este campo es obligatorio"),
                    birth_date: Yup.date().required("Este campo es obligatorio"),
                    gender: Yup.string()
                        .oneOf([
                            "MASCULINO",
                            "FEMENINO",
                        ])
                        .required("Este campo es obligatorio"),
                    state: Yup.string()
                        .oneOf([
                            "ARTIGAS",
                            "CANELONES",
                            "COLONIA",
                            "DURAZNO",
                            "FLORES",
                            "FLORIDA",
                            "LAVALLEJA",
                            "MALDONADO",
                            "MONTEVIDEO",
                            "PAYSANDU",
                            "RIO_NEGRO",
                            "RIVERA",
                            "ROCHA",
                            "SALTO",
                            "SAN_JOSE",
                            "SORIANO",
                            "TACUAREMBO",
                            "TREINTA_Y_TRES",
                        ])
                        .required("Este campo es obligatorio"),
                    city: Yup.string().required("Este campo es obligatorio"),
                    specialty: Yup.string()
                        .oneOf([
                            "PSICOLOGIA",
                            "NUTRICION",
                            "FONOAUDIOLOGIA",
                            "ODONTOLOGIA"
                        ])
                        .required("Este campo es obligatorio"),
                    phone: Yup.string().required("Este campo es obligatorio"),
                    title: Yup.string().required("Este campo es obligatorio"),
                    photo: Yup.string().required("Este campo es obligatorio"),
                    modality: Yup.array().min(
                        1,
                        "Debe seleccionar al menos una modalidad"
                    )
                })}
                onSubmit={async (values) => {
                    console.log(values)
                    // const response = await actions.createUser(values);
                    // if (response.status === 201) {
                    //     navigate("/login");
                    // }
                }}
            >
                {({ handleSubmit }) => (
                    <Form onSubmit={handleSubmit} className="container contenido" style={{ maxWidth: "700px" }}>
                        <div className="row p-3 justify-content-between align-items-center bg-tertiary rounded-top text-primary">
                            <div className="col-auto">
                                <h3 className="text-subtitle">Ingresa tus datos</h3>
                            </div>
                            <div className="col-auto">
                                <i className="fa-solid fa-circle-user fa-3x"></i>
                            </div>
                        </div>
                        <div className="row bg-gray p-3 rounded-bottom">
                            <div className="row">
                                <div className="mb-3 col-md-6 col-sm-12">
                                    <label htmlFor="first_name" className="text-label form-label">
                                        Nombre
                                    </label>
                                    <Field
                                        type="text"
                                        className="form-control"
                                        id="first_name"
                                        name="first_name"
                                    />
                                    <ErrorMessage name="first_name" />
                                </div>
                                <div className="mb-3 col-md-6 col-sm-12">
                                    <label htmlFor="last_name" className="text-label form-label">
                                        Apellido
                                    </label>
                                    <Field
                                        type="text"
                                        className="form-control"
                                        id="last_name"
                                        name="last_name"
                                    />
                                    <ErrorMessage name="last_name" />
                                </div>
                                <div className="mb-3 col-md-6 col-sm-12">
                                    <label htmlFor="birth_date" className="text-label form-label">
                                        Fecha de nacimiento
                                    </label>
                                    <Field
                                        type="date"
                                        className="form-control"
                                        id="birth_date"
                                        name="birth_date"
                                    />
                                    <ErrorMessage name="birth_date" />
                                </div>
                                <div className="mb-3 col-md-6 col-sm-12">
                                    <label htmlFor="gender" className="text-label form-label">
                                        Género
                                    </label>
                                    <Field as="select" className="form-select" id="gender" name="gender">
                                        <option value="">Seleccione su género</option>
                                        <option value="MASCULINO">Hombre</option>
                                        <option value="FEMENINO">Mujer</option>
                                    </Field>
                                </div>

                                <div className="mb-3 col-md-6 col-sm-12">
                                    <label htmlFor="state" className="text-label form-label">
                                        Departamento
                                    </label>
                                    <Field as="select" className="form-select" id="state" name="state">
                                        <option value="">Seleccione un departamento</option>
                                        <option value="ARTIGAS">Artigas</option>
                                        <option value="CANELONES">Canelones</option>
                                        <option value="COLONIA">Colonia</option>
                                        <option value="DURAZNO">Durazno</option>
                                        <option value="FLORES">Flores</option>
                                        <option value="FLORIDA">Florida</option>
                                        <option value="LAVALLEJA">Lavalleja</option>
                                        <option value="MALDONADO">Maldonado</option>
                                        <option value="MONTEVIDEO">Montevideo</option>
                                        <option value="PAYSANDU">Paysandú</option>
                                        <option value="RIO_NEGRO">Río Negro</option>
                                        <option value="RIVERA">Rivera</option>
                                        <option value="ROCHA">Rocha</option>
                                        <option value="SALTO">Salto</option>
                                        <option value="SAN_JOSE">San José</option>
                                        <option value="SORIANO">Soriano</option>
                                        <option value="TACUAREMBO">Tacuarembó</option>
                                        <option value="TREINTA_Y_TRES">Treinta y Tres</option>
                                    </Field>
                                </div>

                                <div className="mb-3 col-md-6 col-sm-12">
                                    <label htmlFor="city" className="text-label form-label">
                                        Ciudad
                                    </label>
                                    <Field
                                        type="text"
                                        className="form-control"
                                        id="city"
                                        name="city"
                                    />
                                    <ErrorMessage name="city" />
                                </div>

                                <div className="mb-3 col-md-12 col-sm-12">
                                    <label htmlFor="specialty" className="text-label form-label"> {/* Cambiado a 'specialty' */}
                                        Especialidad
                                    </label>
                                    <Field as="select" className="form-select" id="specialty" name="specialty"> {/* Cambiado a 'specialty' */}
                                        <option value="">Seleccione una especialidad</option>
                                        <option value="PSICOLOGIA">Psicología</option>
                                        <option value="NUTRICION">Nutrición</option>
                                        <option value="FONOAUDIOLOGIA">Fonoaudiología</option>
                                        <option value="ODONTOLOGIA">Odontología</option>
                                    </Field>
                                </div>


                                <div className="mb-3 col-md-6 col-sm-12">
                                    <label htmlFor="title" className="text-label form-label">
                                        Título o certificado habilitante
                                    </label>
                                    <Field
                                        type="file"
                                        className="form-control"
                                        id="title"
                                        name="title"
                                    />
                                    <ErrorMessage name="title" />
                                </div>

                                <div className="mb-3 col-md-6 col-sm-12">
                                    <label htmlFor="photo" className="text-label form-label">
                                        Foto de perfil
                                    </label>
                                    <Field
                                        type="file"
                                        className="form-control"
                                        id="photo"
                                        name="photo"
                                    />
                                    <ErrorMessage name="photo" />
                                </div>

                                <div className="mb-3 col-md-6 col-sm-12">
                                    <label htmlFor="phone" className="text-label form-label">
                                        Teléfono de contacto
                                    </label>
                                    <Field
                                        type="phone"
                                        className="form-control"
                                        id="phone"
                                        name="phone"
                                    />
                                    <ErrorMessage name="phone" />
                                </div>

                                <div className="mb-3 col-md-6 col-sm-12">
                                    <label htmlFor="calendly" className="text-label form-label">
                                        URL de Calendly
                                    </label>
                                    <Field
                                        type="text"
                                        className="form-control"
                                        id="calendly"
                                        name="calendly"
                                    />
                                    <ErrorMessage name="calendly" />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="modality" className="text-label">
                                        Modalidad de consulta
                                    </label>
                                    <div className="mb-3" role="group">
                                        <div className="form-check">
                                            <Field
                                                type="checkbox"
                                                name="modality"
                                                className="form-check-input"
                                                id="remoto"
                                                value="Remoto"
                                            />
                                            <label className="form-check-label" htmlFor="remoto">
                                                Remoto
                                            </label>
                                        </div>
                                        <div className="form-check">
                                            <Field
                                                type="checkbox"
                                                name="modality"
                                                className="form-check-input"
                                                id="presencial"
                                                value="Presencial"
                                            />
                                            <label className="form-check-label" htmlFor="presencial">
                                                Presencial
                                            </label>
                                        </div>

                                    </div>
                                </div>
                            </div>
                            <div className="col-12 text-center">
                                <button type="submit" className="btn bg-primary text-white">
                                    <i className="fa-solid fa-user-plus"></i> Registrarse como profesional
                                </button>
                            </div>
                        </div>
                    </Form>
                )}
            </Formik>
            <div className="mt-3 d-flex justify-content-center">
                <p>
                    ¿Ya tienes una cuenta?{" "}
                    <Link to={"/login"} className="fw-bold text-primary">
                        Inicia sesión
                    </Link>
                </p>
            </div>
        </>
    );
};
