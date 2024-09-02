import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { Context } from "../store/appContext";

import "../../styles/home.css";

export const VistaNuevoRegistroPaciente = () => {
    const { actions } = useContext(Context);
    const [states, setStates] = useState([]);
    const navigate = useNavigate();
    const location = useLocation();
    const id = location.state ? location.state.id : null;

    useEffect(() => {
        const getStates = async () => {
            const response = await actions.getStates();
            setStates(response);
        }
        getStates();
    }, []);

    return (
        <Formik
            initialValues={{
                first_name: "",
                last_name: "",
                birth_date: "",
                city_id: "",
                state_id: "",
            }}

            validationSchema={Yup.object({
                first_name: Yup.string().required("Este campo es obligatorio"),
                last_name: Yup.string().required("Este campo es obligatorio"),
                birth_date: Yup.date(),
                state_id: Yup.number().required("Este campo es obligatorio"),
                city_id: Yup.number().required("Este campo es obligatorio"),
            })}

            onSubmit={async (values) => {
                try {
                    const response = await actions.updateUser(id, { state_id: parseInt(values.state_id), city_id: parseInt(values.city_id), ...values });
                    if (response.status === 200) {
                        navigate("/login");
                    }
                } catch (error) {
                    console.error("Error al actualizar el usuario", error);
                }
            }}
        >
            {({ values, handleChange }) => (
                <div
                    className="hero min-h-screen bg-cover bg-center"
                    style={{ backgroundImage: "url('https://s2-g1.glbimg.com/5h3pKmve7qeMRwie_mwzVRhs0ng=/0x0:3500x2338/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_59edd422c0c84a879bd37670ae4f538a/internal_photos/bs/2020/2/o/dn5AF5QLeyVU8VsEb2mA/bench-accounting-c3v88boorom-unsplash.jpg')" }}
                >
                    <div className="hero-content flex-col lg:flex-row-reverse w-full justify-center">
                        <div className="card w-full max-w-4xl bg-base-100 bg-opacity-85 backdrop-blur shadow-2xl p-6">
                            <h3 className="text-2xl font-bold text-center mb-5">Ingresa tus datos</h3>
                            <Form className="form-control">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="form-control mb-4">
                                        <label htmlFor="first_name" className="label">
                                            <span className="label-text">Nombre</span>
                                        </label>
                                        <Field
                                            type="text"
                                            id="first_name"
                                            placeholder="Nombre"
                                            name="first_name"
                                            className="input input-bordered"
                                        />
                                        <div className="label">
                                            <ErrorMessage
                                                name="first_name"
                                                component="span"
                                                className="text-error label-text"
                                            />
                                        </div>
                                    </div>
                                    <div className="form-control mb-4">
                                        <label htmlFor="last_name" className="label">
                                            <span className="label-text">Apellido</span>
                                        </label>
                                        <Field
                                            type="text"
                                            id="last_name"
                                            placeholder="Apellido"
                                            name="last_name"
                                            className="input input-bordered"
                                        />
                                        <div className="label">
                                            <ErrorMessage
                                                name="last_name"
                                                component="span"
                                                className="text-error label-text"
                                            />
                                        </div>
                                    </div>
                                    <div className="form-control mb-4">
                                        <label htmlFor="birth_date" className="label">
                                            <span className="label-text">Fecha de nacimiento</span>
                                        </label>
                                        <Field
                                            type="date"
                                            id="birth_date"
                                            placeholder="Fecha de nacimiento"
                                            name="birth_date"
                                            className="input input-bordered"
                                        />
                                        <div className="label">
                                            <ErrorMessage
                                                name="birth_date"
                                                component="span"
                                                className="text-error label-text"
                                            />
                                        </div>
                                    </div>
                                    <div className="form-control mb-4">
                                        <label htmlFor="state_id" className="label">
                                            <span className="label-text">Departamento</span>
                                        </label>
                                        <Field
                                            as="select"
                                            id="state_id"
                                            placeholder="Departamento"
                                            name="state_id"
                                            className="select select-bordered"
                                        >
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

                                        </div>
                                        <ErrorMessage
                                            name="state_id"
                                            component="span"
                                            className="text-error label-text"
                                        />
                                    </div>
                                    <div className="form-control mb-4">
                                        <label htmlFor="city_id" className="label">
                                            <span className="label-text">Ciudad</span>
                                        </label>
                                        <Field
                                            as="select"
                                            id="city_id"
                                            placeholder="Ciudad"
                                            name="city_id"
                                            className="select select-bordered"
                                        >
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
                                            <ErrorMessage
                                                name="city_id"
                                                component="span"
                                                className="text-error label-text"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="form-control mt-6">
                                    <button type="submit" className="btn btn-primary">
                                        <i className="fa-solid fa-user-plus"></i> Registrarse
                                    </button>
                                </div>
                                <div className="mt-3 text-center">
                                    <p>
                                        ¿Ya tienes una cuenta?{" "}
                                        <Link to={"/login"} className="link link-hover text-primary font-bold">
                                            Inicia sesión
                                        </Link>
                                    </p>
                                </div>
                            </Form>
                        </div>
                    </div>
                </div>
            )}
        </Formik>
    );
};