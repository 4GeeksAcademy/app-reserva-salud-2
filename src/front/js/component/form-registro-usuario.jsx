import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { Context } from "../store/appContext";

import "../../styles/home.css";

export const RegistroUsuario = () => {
  const { actions } = useContext(Context);
  const navigate = useNavigate();

  return (
    <Formik
      initialValues={{
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        birth_date: "",
        state: "",
        terms_and_conditions: false,
      }}
      validationSchema={Yup.object({
        first_name: Yup.string().required("Este campo es obligatorio"),
        last_name: Yup.string().required("Este campo es obligatorio"),
        email: Yup.string()
          .email("Dirección de email inválida")
          .required("Este campo es obligatorio"),
        password: Yup.string()
          .required("Este campo es obligatorio")
          .min(6, "Debe tener como mínimo 6 caracteres"),
        birth_date: Yup.date().required("Este campo es obligatorio"),
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
        terms_and_conditions: Yup.boolean().oneOf(
          [true],
          "Debes aceptar los términos y condiciones"
        ),
      })}
      onSubmit={async (values) => {
        const response = await actions.createUser(values);
        if (response.status === 201) {
          navigate("/login");
        }
      }}
    >
      <div className="container contenido" style={{ maxWidth: "700px" }}>
        <div className="row p-3 justify-content-between align-items-center bg-primary rounded-top text-white">
          <div className="col-auto">
            <h1 className="text-title">Registro de usuario</h1>
            <h2 className="text-subtitle">Registrate e ingresa hoy mismo</h2>
          </div>
          <div className="col-auto">
            <i className="fa-solid fa-circle-user fa-3x"></i>
          </div>
        </div>
        <Form className="row bg-tertiary p-3 rounded-bottom">
          <div className="mb-3">
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
          <div className="mb-3">
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
          <div className="mb-3">
            <label htmlFor="email" className="text-label form-label">
              Email
            </label>
            <Field
              type="email"
              className="form-control"
              id="email"
              name="email"
            />
            <ErrorMessage name="email" />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="text-label form-label">
              Contraseña
            </label>
            <Field
              type="password"
              className="form-control"
              id="password"
              name="password"
            />
            <ErrorMessage name="password" />
          </div>
          <div className="mb-3">
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
          <div className="mb-3">
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

          <div className="mb-3 form-check">
            <label className="form-label">
              <Field
                type="checkbox"
                name="terms_and_conditions"
                className="form-check-input"
                id="terms_and_conditions"
              />
              He leído los{" "}
              <Link className="text-primary" to={"/terminos-y-condiciones"}>
                {" "}
                términos y condiciones
              </Link>
            </label>
            <ErrorMessage name="terms_and_conditions" />
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
        </Form>
      </div>
    </Formik>
  );
};
