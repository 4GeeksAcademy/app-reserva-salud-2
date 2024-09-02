import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { Context } from "../store/appContext";
import { ModalTerminosyCondiciones } from "../component/ModalTerminosYCondiciones.jsx";

export const VistaNuevoRegistroUnificado = () => {
  const { actions } = useContext(Context);
  const navigate = useNavigate();
  const [mostrarModal, setMostrarModal] = useState(false);

  const abrirModal = () => setMostrarModal(true);
  const cerrarModal = () => setMostrarModal(false);

  return (
    <>
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
    rol: Yup.string()
      .oneOf(["profesional", "paciente"], "Debes seleccionar una opción")
      .required("Este campo es obligatorio"),
    terms_and_conditions: Yup.boolean().isTrue(
      "Debes aceptar los términos y condiciones"
    ),
  })}
  onSubmit={async (values) => {
    if (values.rol === "profesional") {
      try {
        const response = await actions.createProfessional(values);
        if (response.status === 201) {
          console.log(response);
          navigate("/nuevo-registro-profesional", {
            state: { id: response.data.professional_id },
          });
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
          console.log(response);
          navigate("/nuevo-registro-paciente", {
            state: { id: response.data.user_id },
          });
        } else {
          throw new Error("Error al crear el paciente");
        }
      } catch (error) {
        console.error(error);
      }
    }
  }}
>
<div className="hero bg-base-200 min-h-screen flex items-center justify-center">
  <div className="hero-content flex-col pt-20 lg:flex-row-reverse items-center lg:items-start">
    {/* Contenedor de la descripción */}
    <div className="text-center lg:text-left lg:pr-10 mb-6 lg:mb-0">
      <h1 className="text-5xl font-bold lg:text-left text-center">
        Registro de Usuario
      </h1>
      <p className="py-6 text-center lg:text-left">
      ¡Regístrate ahora como profesional o paciente y comienza a vivir la experiencia de nuestros servicios exclusivos! Estás a solo 5 minutos de unirte a la app que transformará la manera en que reservas con profesionales del área de la salud. Es fácil, rápido y completamente seguro. ¡No esperes más para disfrutar de la comodidad y eficiencia que mereces!
      </p>
    </div>

    {/* Contenedor del formulario */}
    <div className="card bg-base-100 bg-opacity-70 w-full max-w-lg shrink-0 shadow-2xl mx-auto">
      <Form className="card-body">
        {/* Input de Email */}
        <div className="form-control">
          <label htmlFor="email" className="label">
            <span className="label-text">Email</span>
          </label>
          <Field
            type="email"
            id="email"
            name="email"
            className="input input-bordered"
            placeholder="Ingresa tu email"
          />
          <ErrorMessage name="email" component="div" className="text-red-500" />
        </div>

        {/* Input de Contraseña */}
        <div className="form-control">
          <label htmlFor="password" className="label">
            <span className="label-text">Contraseña</span>
          </label>
          <Field
            type="password"
            id="password"
            name="password"
            className="input input-bordered"
            placeholder="Ingresa tu contraseña"
          />
          <ErrorMessage name="password" component="div" className="text-red-500" />
        </div>

        {/* Radio para seleccionar el rol */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Registrarme como:</span>
          </label>
          <div className="flex gap-4">
            <label className="flex items-center">
              <Field
                type="radio"
                name="rol"
                value="profesional"
                className="radio"
              />
              <span className="ml-2">Profesional</span>
            </label>
            <label className="flex items-center">
              <Field
                type="radio"
                name="rol"
                value="paciente"
                className="radio"
              />
              <span className="ml-2">Paciente</span>
            </label>
          </div>
          <ErrorMessage name="rol" component="div" className="text-red-500" />
        </div>

        {/* Checkbox de términos y condiciones */}
        <div className="form-control flex flex-row items-center gap-2 mt-2">
          <Field
            type="checkbox"
            name="terms_and_conditions"
            className="checkbox"
          />
          <span className="label-text">
            He leído los{" "}
            <Link
              onClick={abrirModal}
              className="text-blue-500 underline"
            >
              términos y condiciones
            </Link>
          </span>
          <ErrorMessage name="terms_and_conditions" component="div" className="text-red-500" />
        </div>

        {/* Botón de submit */}
        <div className="form-control mt-6">
          <button type="submit" className="btn btn-primary">
            <i className="fa-solid fa-user-plus"></i> Registrarse
          </button>
        </div>

        {/* Link para iniciar sesión */}
        <div className="mt-3 text-center">
          <p>
            ¿Ya tienes una cuenta?{" "}
            <Link
              to={"/login"}
              className="text-blue-500 underline font-semibold"
            >
              Inicia sesión
            </Link>
          </p>
        </div>
      </Form>
    </div>
  </div>
</div>
</Formik>
{mostrarModal && (
    <ModalTerminosyCondiciones mostrarModal={mostrarModal} cerrarModal={cerrarModal} />
  )}
    </>
  );
};
