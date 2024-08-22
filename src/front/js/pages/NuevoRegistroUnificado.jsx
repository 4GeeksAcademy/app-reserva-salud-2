import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { Context } from "../store/appContext";

export const VistaNuevoRegistroUnificado = () => {
  const { actions } = useContext(Context);
  const navigate = useNavigate();

  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
        rol: "",
        terms_and_conditions: false,
      }}
      validationSchema={Yup.object({
        email: Yup.string()
          .email("Dirección de email inválida")
          .required("Este campo es obligatorio"),
        password: Yup.string()
          .required("Este campo es obligatorio")
          .min(6, "Debe tener como mínimo 6 caracteres"),
        rol: Yup.string().oneOf(
          ["profesional", "paciente"],
          "Debes seleccionar una opción"
        ).required("Este campo es obligatorio"),
        terms_and_conditions: Yup.boolean().isTrue("Debes aceptar los términos y condiciones")
      })}
      onSubmit={async (values) => {

        console.log(values)

        if (values.rol === "profesional") {
          try {
            const response = await actions.createProfessional(values);
            if (response.status === 201) {
              console.log(response)
              navigate("/nuevo-registro-profesional", { state: { id: response.data.professional_id } });
            } else {
              throw new Error("Error al crear el profesional");
            }
          } catch (error) {
            console.error(error);
          }
        } else if (values.rol === "paciente") {
          try {
            const response = await actions.createUser(values);
            if (response.status === 201) {
              console.log(response)
              navigate("/nuevo-registro-paciente", { state: { id: response.data.user_id } });
            } else {
              throw new Error("Error al crear el paciente");
            }
          } catch (error) {
            console.error(error);
          }
        }
      }}
    >
      <div className="container contenido" style={{ paddingTop: "30px", maxWidth: "700px" }}>
        <div className="row p-3 justify-content-between align-items-center bg-tertiary rounded-top text-primary">
          <div className="col-auto">
            <h1 className="text-subtitle">Registro de usuario</h1>
          </div>
          <div className="col-auto">
            <i className="fa-solid fa-circle-user fa-3x"></i>
          </div>
        </div>
        <Form className="row bg-gray p-3 rounded-bottom">
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
          <div className="p-2 mb-3 form-check">
            <label className="text-label p-1">Registrarme como:</label>
            <div>
              <label className="text-label p-1">
                <Field
                  type="radio"
                  name="rol"
                  value="profesional"
                  className="form-radio-input"
                />
                Profesional
              </label>
            </div>
            <div>
              <label className="text-label p-1">
                <Field
                  type="radio"
                  name="rol"
                  value="paciente"
                  className="form-radio-input"
                />
                Paciente
              </label>
            </div>
            <ErrorMessage name="rol" component="div" className="text-danger" />
          </div>

          <div className="mb-3 form-check">
            <label className="text-label p-2">
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
