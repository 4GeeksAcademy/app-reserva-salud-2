import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { Context } from "../store/appContext";
import ImageUpload from "../component/ImageUpload.jsx";

export const VistaNuevoRegistroProfesional = () => {
    const { actions } = useContext(Context);
    const [states, setStates] = useState([]);
    const [selectedState, setSelectedState] = useState("")
    const [cities, setCities] = useState([]);
    const [specialities, setSpecialities] = useState([]);
    const navigate = useNavigate();
    const { state: { id } } = useLocation();

    useEffect(() => {
        const getData = async () => {
            const [states, specialities] = await Promise.all([
                actions.getStates(),
                actions.getSpecialities(),
            ]);
            setStates(states);
            setSpecialities(specialities);
        };
        getData()
    }, []);

    useEffect(() => {
        const getCitiesByState = async () => {
            if (selectedState) {
                const cities = await actions.getCitiesByState(selectedState);
                setCities(cities);
            };
        };

        getCitiesByState();
    }, [selectedState]);

    return (
        <>
            <Formik
                initialValues={{
                    first_name: "",
                    last_name: "",
                    birth_date: "",
                    gender: "",
                    city_id: "",
                    speciality_id: "",
                    certificate: "",
                    profile_picture: "",
                    telephone: "",
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
                    city_id: Yup.number().required("Este campo es obligatorio"),
                    speciality_id: Yup.number().required("Este campo es obligatorio"),
                    telephone: Yup.string().required("Este campo es obligatorio"),
                    profile_picture: Yup.string().required("Este campo es obligatorio"),
                })}

                onSubmit={async (values) => {
                    const response = await actions.updateProfessional(id, { city_id: parseInt(values.city_id), speciality_id: parseInt(values.speciality_id), ...values });
                    if (response.status === 200) {
                        navigate("/login");
                    } else {
                        console.error("Error al actualizar el profesional");
                    }
                }}
            >
                {({ handleSubmit, values }) => (
                    <Form onSubmit={handleSubmit} className="container contenido mb-5" style={{ paddingTop: "40px", maxWidth: "700px" }}>
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
                                    <ErrorMessage className="text-normal text-primary" component="div" name="first_name" />
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
                                    <ErrorMessage className="text-normal text-primary" component="div" name="last_name" />
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
                                    <ErrorMessage className="text-normal text-primary" component="div" name="birth_date" />
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
                                    <label htmlFor="state_id" className="text-label form-label">
                                        Departamento
                                    </label>
                                    <Field as="select" className="form-select" id="state_id" name="state_id" onChange={(e) => setSelectedState(e.target.value)}>
                                        <option value="">Seleccione un departamento</option>
                                        {
                                            states?.map((state) => {
                                                return (
                                                    <option key={state.id} value={state.id}>{state.name}</option>
                                                )
                                            })
                                        }
                                    </Field>
                                </div>

                                <div className="mb-3 col-md-6 col-sm-12">
                                    <label htmlFor="city_id" className="text-label form-label">
                                        Ciudad
                                    </label>
                                    <Field as="select" className="form-select" id="city_id" name="city_id">
                                        <option value="">Seleccione una ciudad</option>
                                        {
                                            cities.map((city) => {
                                                return (
                                                    <option key={city.id} value={city.id}>{city.name}</option>
                                                )
                                            })
                                        }
                                    </Field>
                                    <ErrorMessage name="city_id" />
                                </div>

                                <div className="mb-3 col-md-12 col-sm-12">
                                    <label htmlFor="speciality_id" className="text-label form-label">
                                        Especialidad
                                    </label>
                                    <Field as="select" className="form-select" id="speciality_id" name="speciality_id">
                                        <option value="">Seleccione una especialidad</option>
                                        {
                                            specialities?.map((speciality) => {
                                                return (
                                                    <option key={speciality.id} value={speciality.id}>{speciality.name}</option>
                                                )
                                            })
                                        }
                                    </Field>
                                    <ErrorMessage name="speciality_id" />
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
                                    <ErrorMessage className="text-normal text-primary" component="div" name="certificate" />
                                </div>

                                <div className="mb-3 col-md-6 col-sm-12">
                                    <label htmlFor="profile_picture" className="text-label form-label">
                                        Foto de perfil
                                    </label>
                                    <Field component={ImageUpload} name="profile_picture" />
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
