import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { Context } from "../store/appContext";
import ImageUpload from "../component/ImageUpload.jsx";

export const VistaNuevoRegistroProfesional = () => {
    const { actions } = useContext(Context);
    const [states, setStates] = useState([]);
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

    return (
        <>
            <Formik
                initialValues={{
                    first_name: "",
                    last_name: "",
                    birth_date: "",
                    gender: "",
                    state_id: "",
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
                    state_id: Yup.string().required("Este campo es obligatorio"),
                    city_id: Yup.string().required("Este campo es obligatorio"),
                    speciality_id: Yup.number().required("Este campo es obligatorio"),
                    telephone: Yup.string().required("Este campo es obligatorio"),
                    profile_picture: Yup.string().required("Este campo es obligatorio"),
                })}

                onSubmit={async (values) => {
                    console.log(values)
                    const response = await actions.updateProfessional(id, { state_id: parseInt(values.state_id), city_id: parseInt(values.city_id), speciality_id: parseInt(values.speciality_id), ...values });
                    if (response.status === 200) {
                        navigate("/login");
                    } else {
                        console.error("Error al actualizar el profesional");
                    }
                }}
            >
                {({ handleSubmit, values }) => (
                    <div className="hero min-h-screen" style={{ backgroundImage: "url(https://d1eipm3vz40hy0.cloudfront.net/images/SSAC-Blog/argumentario-de-ventas.jpg)" }}>
                        <div className="hero-overlay bg-opacity-70"></div>
                        <div className="hero-content">
                            <Form onSubmit={handleSubmit} className="container mx-auto min-h-screen pt-20">
                                <div className="rounded-box border border-base-300 bg-base-200 bg-opacity-75 backdrop-blur">
                                    <div className="flex items-center justify-between rounded-t-box px-8 py-4 text-primary">
                                        <h3 className="text-2xl font-bold">Ingresa tus datos</h3>
                                        <i className="fa-solid fa-circle-user fa-3x text-secondary"></i>
                                    </div>
                                    <div className="flex flex-col rounded-b-box px-8 py-4">
                                        <div className="flex flex-col md:flex-row gap-4">
                                            <div className="form-control w-full">
                                                <div className="label">
                                                    <span className="label-text">Nombre</span>
                                                </div>
                                                <label className="input input-bordered flex items-center gap-2">
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        viewBox="0 0 16 16"
                                                        fill="currentColor"
                                                        className="h-4 w-4 opacity-70">
                                                        <path
                                                            d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
                                                    </svg>
                                                    <Field
                                                        type="text"
                                                        placeholder="Nombre"
                                                        id="first_name"
                                                        name="first_name"
                                                    />
                                                </label>
                                                <div className="label">
                                                    <ErrorMessage className="label-text text-error" component="span" name="first_name" />
                                                </div>
                                            </div>

                                            <div className="form-control w-full">
                                                <div className="label">
                                                    <span className="label-text">Apellido</span>
                                                </div>
                                                <label className="input input-bordered flex items-center gap-2">
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        viewBox="0 0 16 16"
                                                        fill="currentColor"
                                                        className="h-4 w-4 opacity-70">
                                                        <path
                                                            d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
                                                    </svg>
                                                    <Field
                                                        type="text"
                                                        placeholder="Apellido"
                                                        id="last_name"
                                                        name="last_name"
                                                    />
                                                </label>
                                                <div className="label">
                                                    <ErrorMessage className="label-text text-error" component="span" name="last_name" />
                                                </div>
                                            </div>
                                        </div>


                                        <div className="flex flex-col md:flex-row gap-4">
                                            <div className="form-control w-full">
                                                <div className="label">
                                                    <span className="label-text">Fecha de nacimiento</span>
                                                </div>
                                                <Field
                                                    type="date"
                                                    className="input input-bordered"
                                                    id="birth_date"
                                                    name="birth_date"
                                                />
                                                <div className="label">
                                                    <ErrorMessage className="label-text text-error" component="span" name="birth_date" />
                                                </div>
                                            </div>

                                            <div className="form-control w-full">
                                                <div className="label">
                                                    <span className="label-text">Género</span>
                                                </div>
                                                <Field
                                                    as="select"
                                                    className="select select-bordered"
                                                    type="date"
                                                    id="gender"
                                                    name="gender"
                                                >
                                                    <option value="">Seleccione su género</option>
                                                    <option value="MALE">Hombre</option>
                                                    <option value="FEMALE">Mujer</option>
                                                    <option value="OTHER">Otro</option>
                                                </Field>
                                                <div className="label">
                                                    <ErrorMessage className="label-text text-error" component="span" name="gender" />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex flex-col md:flex-row gap-4">
                                            <div className="form-control w-full">
                                                <div className="label">
                                                    <span className="label-text">Departamento</span>
                                                </div>
                                                <Field as="select" className="select select-bordered" id="state_id" name="state_id">
                                                    <option value="">Seleccione un departamento</option>
                                                    {
                                                        states?.map((state) => {
                                                            return (
                                                                <option key={state.id} value={state.id}>{state.name}</option>
                                                            )
                                                        })
                                                    }
                                                </Field>
                                                <div className="label">
                                                    <ErrorMessage className="label-text text-error" component="span" name="state_id" />
                                                </div>
                                            </div>

                                            <div className="form-control w-full">
                                                <div className="label">
                                                    <span className="label-text">Ciudad</span>
                                                </div>
                                                <Field as="select" className="select select-bordered" id="city_id" name="city_id">
                                                    <option value="">Seleccione una ciudad</option>
                                                    {
                                                        states?.find((state) => state.id === parseInt(values.state_id))?.cities.map((city) => {
                                                            return (
                                                                <option key={city.id} value={city.id}>{city.name}</option>
                                                            )
                                                        })
                                                    }
                                                </Field>
                                                <div className="label">
                                                    <ErrorMessage className="label-text text-error" component="span" name="city_id" />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex flex-col md:flex-row gap-4">
                                            <div className="form-control w-full">
                                                <div className="label">
                                                    <span className="label-text">Especialidad</span>
                                                </div>
                                                <Field
                                                    as="select"
                                                    className="select select-bordered"
                                                    id="speciality_id"
                                                    name="speciality_id"
                                                >
                                                    <option value="">Seleccione una especialidad</option>
                                                    {
                                                        specialities?.map((speciality) => {
                                                            return (
                                                                <option key={speciality.id} value={speciality.id}>{speciality.name}</option>
                                                            )
                                                        })
                                                    }
                                                </Field>
                                                <div className="label">
                                                    <ErrorMessage className="label-text text-error" component="span" name="speciality_id" />
                                                </div>
                                            </div>

                                            <div className="form-control w-full">
                                                <div className="label">
                                                    <span className="label-text">Teléfono</span>
                                                </div>
                                                <label className="input input-bordered flex items-center gap-2">
                                                    <i className="fa-solid fa-phone h-4 w-4 opacity-70"></i>
                                                    <Field
                                                        type="tel"
                                                        className="grow"
                                                        placeholder="Teléfono"
                                                        id="telephone"
                                                        name="telephone"
                                                    />
                                                </label>
                                                <div className="label">
                                                    <ErrorMessage className="label-text text-error" component="span" name="telephone" />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex flex-col md:flex-row gap-4">
                                            <div className="form-control w-full">
                                                <div className="label">
                                                    <span className="label-text">Foto de perfil</span>
                                                </div>
                                                <Field component={ImageUpload} name="profile_picture" />
                                                <div className="label">
                                                    <ErrorMessage className="label-text text-error" component="span" name="profile_picture" />
                                                </div>
                                            </div>

                                            <div className="form-control w-full">
                                                <div className="label">
                                                    <span className="label-text">Certificado</span>
                                                </div>
                                                <Field component={ImageUpload} name="certificate" />
                                                <div className="label">
                                                    <ErrorMessage className="label-text text-error" component="span" name="certificate" />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-12 text-center">
                                            <button type="submit" className="btn btn-primary">
                                                <i className="fa-solid fa-user-plus"></i> Registrarse como profesional
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </Form>
                        </div>
                    </div>
                )}
            </Formik>
        </>
    );
};
