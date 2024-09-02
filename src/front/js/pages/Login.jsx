import { Field, Form, Formik } from 'formik';
import React, { useContext, useState } from 'react';
import { ModalRestablecerClave } from '../component/ModalRestablecerClave.jsx';
import { Navigate, Link } from 'react-router-dom';
import * as Yup from 'yup';
import { Context } from "../store/appContext";

export const Login = () => {
  const [mostrarModal, setMostrarModal] = useState(false);

  const abrirModal = () => setMostrarModal(true);
  const cerrarModal = () => setMostrarModal(false);

  const { store, actions } = useContext(Context);

  if (store.currentUser) {
    return <Navigate to='/perfil-paciente' replace />;
  } else if (store.currentProfessional) {
    return <Navigate to='/perfil-profesional' replace />;
  }

  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-base-200">
        <div className="flex flex-col md:flex-row">
          {/* Contenedor de la imagen con el link */}
          <div className="relative hidden md:flex md:w-1/2 bg-cover bg-center items-center justify-end p-4 pb-10">
            <img
              src="https://st2.depositphotos.com/1001599/43046/v/450/depositphotos_430460192-stock-illustration-sign-page-abstract-concept-vector.jpg"
              className="object-cover mix-blend-multiply w-full h-auto"
              alt="Background"
            />
            <div className="absolute bottom-10 w-full flex flex-col items-center">
              <p className="text-black text-center">
                ¿Aún no tienes cuenta?
                <Link to="/nuevo-registro" className="text-primary ml-1 underline">
                  Regístrate
                </Link>
              </p>
            </div>
          </div>
          {/* Contenedor del formulario */}
          <div className="w-full md:w-1/2 lg:max-w-lg p-6 lg:p-8 mx-auto relative">
            <div
              className="absolute inset-0 md:hidden bg-cover bg-center opacity-20"
              style={{
                backgroundImage:
                  "url('https://st2.depositphotos.com/1001599/43046/v/450/depositphotos_430460192-stock-illustration-sign-page-abstract-concept-vector.jpg')",
              }}
            ></div>
            <div className="flex justify-center">
              <i className="fa-solid fa-circle-user fa-3x"></i>
            </div>
            <h1 className="text-3xl lg:text-4xl font-bold">Inicia sesión ahora!</h1>
            <p className="text-base lg:text-lg mt-4">
              Al ingresar a Reserva Salud, podrás buscar un profesional en tu departamento, vas a contar con amplia disponibilidad horaria para agendar una consulta y muchas funciones más...
            </p>

            {/* Formulario con Formik */}
            <Formik
              initialValues={{ email: '', password: '' }}
              validationSchema={Yup.object({
                email: Yup.string()
                  .email('Correo electrónico inválido')
                  .required('Campo requerido'),
                password: Yup.string()
                  .required('Campo requerido')
                  .min(6, 'La contraseña debe tener al menos 6 caracteres'),
              })}
              onSubmit={async ({ email, password }) => {
                const response = await actions.login(email, password);

                if (response.status === 200) {
                  if (response.data.user) {
                    return <Navigate to='/perfil-paciente' replace />;
                  } else if (response.data.professional) {
                    return <Navigate to='/perfil-profesional' replace />;
                  }
                }
              }}
            >
              {({ errors, touched }) => (
                <Form className="space-y-4 z-10 relative">
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Email</span>
                    </label>
                    <Field
                      type="email"
                      placeholder="Ingresa tu email"
                      className="input input-bordered w-full"
                      name="email"
                      id="email"
                    />
                    {errors.email && touched.email ? (
                      <div className="text-red-500 text-sm">{errors.email}</div>
                    ) : null}
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Password</span>
                    </label>
                    <Field
                      type="password"
                      placeholder="Ingresa tu password"
                      className="input input-bordered w-full"
                      name="password"
                      id="password"
                    />
                    {errors.password && touched.password ? (
                      <div className="text-red-500 text-sm">{errors.password}</div>
                    ) : null}
                  </div>
                  <div className="form-control mt-6">
                    <button type="submit" className="btn btn-primary w-full">
                      Ingresar
                    </button>
                    <p className="md:hidden text-black text-center mt-3">
                      ¿Aún no tienes cuenta?
                      <Link to="/nuevo-registro" className="text-primary ml-1 underline">
                        Regístrate
                      </Link>
                    </p>
                  </div>
                </Form>
              )}
            </Formik>
            <p className='text-label text-center'>
          ¿Olvidaste tu contraseña?
          <Link onClick={abrirModal} className='text-primary underline'>Restablecer</Link>
        </p>
        {mostrarModal && <ModalRestablecerClave cerrarModal={cerrarModal} />}
          </div>
        </div>
      </div>
      <div>
        
      </div>
    </>
  );
};