import { ErrorMessage, Field, Form, Formik } from 'formik';
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
        {() => (
          <div className="hero min-h-screen" style={{ backgroundImage: "url(https://www.berlin.de/imgscaler/NeOe3sl9470rncqxEeP5yyBzOvEMVIOrkkkBTDAQF_U/rbig2zu1/L3N5czExLXByb2QvZm90b2xpYS9nZWdlbnN0YWVuZGUvZm90b2xpYV80MTAyOTY4NF9zdWJzY3JpcHRpb25fbW9udGhseV94eGwuanBn.jpg?ts=1700050821)" }}>
            <div className='hero-overlay bg-opacity-70'></div>
            <div className="hero-content flex-col lg:flex-row-reverse">
              <div className="text-center lg:text-left max-w-lg text-neutral-content">
                <h1 className="text-5xl font-bold">Inicia sesión ahora!</h1>
                <p className="py-6 text-justify font-medium text-lg">
                  Al acceder a Reserva Salud, tendrás la capacidad de buscar profesionales en tu departamento
                  y beneficiarte de una amplia disponibilidad horaria para programar tus consultas.
                  Además, nuestra plataforma ofrece una variedad de funcionalidades diseñadas para optimizar
                  tu experiencia y satisfacer tus necesidades de manera eficiente.
                </p>
              </div>
              <div className="card bg-base-100 bg-opacity-80 w-full max-w-sm shrink-0 shadow-2xl">
                <Form className="card-body">
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Email</span>
                    </label>
                    <Field type="email" placeholder="Email" name="email" id="email" className="input input-bordered" />
                    <label className='label'>
                      <ErrorMessage component="span" name="email" className='text-error label-text' />
                    </label>
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Contraseña</span>
                    </label>
                    <Field type="password" placeholder="Contraseña" name="password" id="password" className="input input-bordered" />
                    <label className="label">
                      <ErrorMessage component="span" name="password" className='text-error label-text' />
                    </label>
                  </div>
                  <p className='text-label text-center'>
                    ¿Olvidaste tu contraseña?{" "}
                    <Link onClick={abrirModal} className='link link-primary'>Restablecer</Link>
                  </p>
                  <div className="form-control mt-6">
                    <button type='submit' className="btn btn-primary">Iniciar sesión</button>
                  </div>
                  <p className='text-center'>
                    ¿Aún no tienes cuenta?{" "}
                    <Link to="/nuevo-registro" className="link link-primary">
                      Regístrate
                    </Link>
                  </p>
                </Form>
              </div>
            </div>
          </div>
        )}
      </Formik>
      {mostrarModal && <ModalRestablecerClave cerrarModal={cerrarModal} />}
    </>
  );
};