import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { Context } from "../store/appContext";

import "../../styles/home.css";

export const VistaNuevoRegistroPaciente = () => {
    const { actions } = useContext(Context);
    const [states, setStates] = useState([]);
    const [selectedState, setSelectedState] = useState("")
    const [cities, setCities] = useState([]);
    const navigate = useNavigate();
    const { state: { id } } = useLocation();

    useEffect(() => {
        const getStates = async () => {
            const response = await actions.getStates();
            setStates(response);
        }
        getStates();
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
                    const response = await actions.updateUser(id, { state_id: parseInt(values.state_id), city_id: parseInt(values.city_id), ...values })
                    if (response.status === 200) {
                        navigate("/perfil");
                    }
                } catch (error) {
                    console.error("Error al actualizar el usuario", error);
                }
            }}
        >
            {
                ({ values, errors, touched, handleChange }) => (
                    <Form className="container contenido" style={{ paddingTop: "40px", paddingBottom: "40px", maxWidth: "700px" }}>
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
                            </div>
                            <div className="row">
                                <div className="mb-3 col-md-12 col-sm-12">
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
                                    <label htmlFor="state_id" className="text-label form-label">
                                        Departamento
                                    </label>
                                    <Field as="select" className="form-select" id="state_id" name="state_id" onChange={(e) => {
                                        setSelectedState(e.target.value)
                                        handleChange(e)
                                    }}>
                                        <option value="">Seleccione un departamento</option>
                                        {
                                            states?.map((state) => {
                                                return (
                                                    <option key={state.id} value={state.id}>
                                                        {state.name}
                                                    </option>
                                                )
                                            })
                                        }
                                    </Field>
                                    <ErrorMessage name="state_id" />
                                </div>

                                <div className="mb-3 col-md-6 col-sm-12">
                                    <label htmlFor="city_id" className="text-label form-label">
                                        Ciudad
                                    </label>
                                    <Field as="select" className="form-select" id="city_id" name="city_id">
                                        <option value="">Seleccione una ciudad</option>
                                        {
                                            cities.map((city) => (
                                                <option key={city.id} value={city.id}>
                                                    {city.name}
                                                </option>
                                            ))
                                        }
                                    </Field>
                                    <ErrorMessage name="city_id" />
                                </div>

                            </div>
                            <div className="col-12 text-center">
                                <button type="submit" className="btn bg-primary text-white">
                                    <i className="fa-solid fa-user-plus"></i> Registrarse
                                </button>
                            </div>

                            <div className="mt-3 d-flex justify-content-center">
                                <p>
                                    ¿Ya tienes una cuenta?{" "}
                                    <Link to={"/login"} className="fw-bold text-primary">
                                        Inicia sesión
                                    </Link>
                                </p>
                            </div>
                        </div>
                    </Form>
                )
            }


        </Formik>
    );
};
