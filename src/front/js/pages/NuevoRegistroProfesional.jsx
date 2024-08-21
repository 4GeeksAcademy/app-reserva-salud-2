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
                    speciality: "",
                    certificate: "",
                    profile_picture: "",
                    telephone: "",
                    appointment_type: ""
                }}
                validationSchema={Yup.object({
                    first_name: Yup.string().required("Este campo es obligatorio"),
                    last_name: Yup.string().required("Este campo es obligatorio"),
                    birth_date: Yup.date().required("Este campo es obligatorio"),
                    gender: Yup.string()
                        .oneOf([
                            "MALE",
                            "FEMALE",
                            "OTHER"
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
                    speciality: Yup.string()
                        .oneOf([
                            "PSICOLOGIA",
                            "NUTRICION",
                            "FONOAUDIOLOGIA",
                            "ODONTOLOGIA"
                        ])
                        .required("Este campo es obligatorio"),
                    telephone: Yup.string().required("Este campo es obligatorio"),
                    appointment_type: Yup.array().min(
                        1,
                        "Debe seleccionar una modalidad"
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
                                        <option value="MALE">Hombre</option>
                                        <option value="FEMALE">Mujer</option>
                                        <option value="OTHER">Otro</option>
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
                                    <label htmlFor="state" className="text-label form-label">
                                        Ciudad
                                    </label>
                                    <Field as="select" className="form-select" id="state" name="state">
                                        <option value="">Seleccione una ciudad</option>
                                        <option value="ARTIGAS">Ciudad</option>
                                        <option value="CANELONES">Ciudad</option>
                                        <option value="COLONIA">Ciudad</option>
                                    </Field>
                                    <ErrorMessage name="state" />
                                </div>

                                <div className="mb-3 col-md-12 col-sm-12">
                                    <label htmlFor="speciality" className="text-label form-label"> {/* Cambiado a 'speciality' */}
                                        Especialidad
                                    </label>
                                    <Field as="select" className="form-select" id="speciality" name="speciality"> {/* Cambiado a 'speciality' */}
                                        <option value="">Seleccione una especialidad</option>
                                        <option value="PSICOLOGIA">Psicología</option>
                                        <option value="NUTRICION">Nutrición</option>
                                        <option value="FONOAUDIOLOGIA">Fonoaudiología</option>
                                        <option value="ODONTOLOGIA">Odontología</option>
                                    </Field>
                                </div>

                                <div className="mb-3 col-md-6 col-sm-12">
                                    <label htmlFor="certificate" className="text-label form-label">
                                        Título o certificado habilitante
                                    </label>
                                    <Field
                                        type="file"
                                        className="form-control"
                                        id="certificate"
                                        name="certificate"
                                    />
                                    <ErrorMessage name="certificate" />
                                </div>

                                <div className="mb-3 col-md-6 col-sm-12">
                                    <label htmlFor="profile_picture" className="text-label form-label">
                                        Foto de perfil
                                    </label>
                                    <Field
                                        type="file"
                                        className="form-control"
                                        id="profile_picture"
                                        name="profile_picture"
                                    />
                                    <ErrorMessage name="profile_picture" />
                                </div>

                                <div className="mb-3 col-md-6 col-sm-12">
                                    <label htmlFor="telephone" className="text-label form-label">
                                        Teléfono de contacto
                                    </label>
                                    <Field
                                        type="telephone"
                                        className="form-control"
                                        id="telephone"
                                        name="telephone"
                                    />
                                    <ErrorMessage name="telephone" />
                                </div>

                                <div className="mb-3 col-md-6 col-sm-12">
                                    <label htmlFor="appointment_type" className="text-label form-label">
                                        Modalidad de consulta
                                    </label>
                                    <Field as="select" className="form-select" id="appointment_type" name="appointment_type">
                                        <option value="">Seleccione la modalidad</option>
                                        <option value="PSICOLOGIA">Remoto</option>
                                        <option value="NUTRICION">Presencial</option>
                                        <option value="FONOAUDIOLOGIA">Ambas</option>
                                    </Field>
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
