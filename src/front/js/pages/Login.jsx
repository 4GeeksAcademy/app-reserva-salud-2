import { Field, Form, Formik } from 'formik'
import React, { useContext, useState } from 'react';
import { ModalRestablecerClave } from '../component/ModalRestablecerClave.jsx';
import { Navigate, Link } from 'react-router-dom'
import * as Yup from 'yup'
import { Context } from "../store/appContext";

export const Login = () => {
  const [mostrarModal, setMostrarModal] = useState(false);

  const abrirModal = () => setMostrarModal(true);
  const cerrarModal = () => setMostrarModal(false);

  const { store, actions } = useContext(Context);

  if (store.isAuthenticated) {
    return <Navigate to='/perfil' replace />
  }

  return (
    <div className='container contenido d-flex flex-column align-items-center justify-content-center mb-5' style={{ paddingTop: "40px", maxWidth: "1000px" }}>
    <div className="row">
      <div className='col-md-6 d-flex flex-column justify-content-center align-items-center'>
        <div className='d-flex justify-content-between align-items-center bg-secondary rounded-top px-5 pt-4 text-white gap-4'>
          <div className='d-flex flex-column gap-2'>
            <h2 className='text-subtitle'>Iniciar sesión</h2>
            <p className='text-label'>Inicia sesión con tu usuario y contraseña</p>
          </div>
          <i className="fa-solid fa-circle-user fa-3x"></i>
        </div>
        <div className='w-100 d-flex flex-column justify-content-center align-items-center bg-tertiary p-3 rounded-bottom'>
          <Formik
            initialValues={{
              email: '',
              password: ''
            }}
            validationSchema={Yup.object({
              email: Yup.string().email('Correo electrónico inválido').required('Campo requerido'),
              password: Yup.string().required('Campo requerido').min(6, 'La contraseña debe tener al menos 6 caracteres')
            })}
            onSubmit={async ({ email, password }) => {
              const response = await actions.login(email, password);
  
              if (response) {
                return <Navigate to='/perfil' replace />
              }
            }}
          >
            {({ errors, touched }) => (
              <Form className='w-100 p-3' noValidate>
                <div className='mb-3'>
                  <label htmlFor='email' className='form-label text-label'>Correo electrónico</label>
                  <Field className='form-control' type='email' id='email' name='email' placeholder='Correo electrónico'/>
                  {errors.email && touched.email && (
                    <p className='text-primary text-label'>{errors.email}</p>
                  )}
                </div>
                <div>
                  <label htmlFor='password' className='form-label text-label'>Contraseña</label>
                  <Field className='form-control' type='password' id='password' name='password' placeholder='Contraseña'/>
                  {errors.password && touched.password && (
                    <p className='text-danger text-label'>{errors.password}</p>
                  )}
                </div>
                <div className="d-flex justify-content-center">
                  <button type='submit' className='btn btn-primary w-50 mt-3 text-btn'>Iniciar sesión</button>
                </div>
                <p className='mt-3 text-label text-center'>¿Aún no tienes cuenta? <Link to={"/nuevo-registro"} className='text-primary'>Regístrate</Link></p>
              </Form>
            )}
          </Formik>
          <p className='text-label text-center'>¿Olvidaste tu contraseña?
            <Link onClick={abrirModal} className='text-primary'>Restablecer</Link></p>
          {mostrarModal && <ModalRestablecerClave cerrarModal={cerrarModal} />}
        </div>
      </div>
      <div className='col-md-6 d-flex justify-content-center align-items-center'>
        <img
          className="img-fluid"
          src="https://st2.depositphotos.com/1001599/43046/v/450/depositphotos_430460192-stock-illustration-sign-page-abstract-concept-vector.jpg"
          alt="Illustration"
        />
      </div>
    </div>
  </div>  
  )
}