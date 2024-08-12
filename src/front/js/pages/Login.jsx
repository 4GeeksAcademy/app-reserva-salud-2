import { Field, Form, Formik, useFormik } from 'formik'
import React from 'react'
import { Link } from 'react-router-dom'
import * as Yup from 'yup'

export const Login = () => {
  return (
    <div className='container contenido d-flex flex-column align-items-center justify-content-center'>
      <div className='d-flex flex-column justify-content-center align-items-center h-100'>
        <div className='w-100 d-flex justify-content-between align-items-center bg-primary rounded-top p-3 text-white gap-4'>
          <div className='d-flex flex-column gap-2'>
            <h2 className='text-subtitle'>Iniciar sesión</h2>
            <p className='text-label'>Iniciar sesión con tu usuario y contraseña</p>
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
            onSubmit={(values) => {
              console.log(values)
            }}
          >
            {({ errors, touched }) => (
              <Form className='w-100 p-3' noValidate>
                <div className='mb-3'>
                  <label htmlFor='email' className='form-label text-label'>Correo electrónico</label>
                  <Field className='form-control' type='email' id='email' name='email' placeholder='Correo electrónico' />
                  {errors.email && touched.email && (
                    <p className='text-danger text-label'>{errors.email}</p>
                  )}
                </div>
                <div>
                  <label htmlFor='password' className='form-label text-label'>Contraseña</label>
                  <Field className='form-control' type='password' id='password' name='password' placeholder='Contraseña' />
                  {errors.password && touched.password && (
                    <p className='text-danger text-label'>{errors.password}</p>
                  )}
                </div>
                <p className='mt-3 text-label text-center'>¿Olvidaste tu contraseña? <Link to={"/"} className='text-primary'>Restablecer</Link></p>

                <button className='btn btn-primary w-100 text-btn'>Iniciar sesión</button>

                <p className='mt-3 text-label text-center'>¿Aún no tienes cuenta? <Link to={"/registro-usuario"} className='text-primary'>Registrate</Link></p>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  )
}