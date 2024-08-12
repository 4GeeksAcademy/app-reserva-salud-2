import { Field, Form, Formik, useFormik } from 'formik'
//importo el hook useContext, para poder tener acceso al Context
import React,{useContext} from 'react';
import { Link } from 'react-router-dom'
import * as Yup from 'yup'
import { Context } from "../store/appContext";
//importo la libreria sweetalert2 para realizar alertas personalizadas
import Swal from 'sweetalert2'
//importo el hook useNavigate para poder redirigir a un usuario a diferentes rutas
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const navigate = useNavigate();
  const {store,actions}=useContext(Context);
  
  return (
    <div className='container contenido'>
      <div className='d-flex flex-column justify-content-center align-items-center h-100'>
        <div className='w-100 d-flex justify-content-between align-items-center bg-primary rounded-top p-3 text-white'>
          <div className='d-flex flex-column gap-2'>
            <h2 className='text-subtitle'>Iniciar sesión</h2>
            <p className='text-label'>Iniciar sesión con tu usuario y contraseña</p>
          </div>
          <i className="fa-solid fa-circle-user fa-2xl"></i>
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
            onSubmit= {async (values) => {
               
               try {
                const login = await actions.login_user(values.email,values.password);
                if (login) {
                  //Utilizo la funcion "fire" de la libreria sweetalert para enviar un alerta personalizado al realizar el login
                  Swal.fire({
                    title: 'Login successfully!',
                    text: `Welcome to the system ${values.email}!`,
                    icon: 'success',
                    timer: 3000
                  });
                  navigate("/");
                } else {
                  Swal.fire({
                    title: 'Error,could not log in!',
                    text: 'incorrect username or password ',
                    icon: 'error',
                    confirmButtonText: 'OK',
                    timer: 3000
                  });
                }
              } catch (error) {
                Swal.fire({
                  title: 'Error!',
                  text: 'ups, problem with the server!',
                  icon: 'error',
                  confirmButtonText: 'OK',
                  timer: 3000
                });
              }
            }}
          >
            {({ errors, touched }) => (
              <Form className='w-100' noValidate>
                <div className='mb-3'>
                  <label htmlFor='email' className='form-label text-label'>Correo electrónico</label>
                  <Field className='form-control' type='email' id='email' name='email' placeholder='Correo electrónico' 
                  
                  />
                  {errors.email && touched.email && (
                    <p className='text-danger text-label'>{errors.email}</p>
                  )}
                </div>
                <div>
                  <label htmlFor='password' className='form-label text-label'>Contraseña</label>
                  <Field className='form-control' type='password' id='password' name='password' placeholder='Contraseña' 
                  
                  />
                  {errors.password && touched.password && (
                    <p className='text-danger text-label'>{errors.password}</p>
                  )}
                </div>
                <p className='mt-3 text-label text-center'>¿Olvidaste tu contraseña? <Link to={"/"}>Restablecer</Link></p>

                <button className='btn btn-primary w-100 text-btn'>Iniciar sesión</button>

                <p className='mt-3 text-label text-center'>¿Aún no tienes cuenta? <Link to={"/registro-usuario"}>Registrate</Link></p>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  )
}