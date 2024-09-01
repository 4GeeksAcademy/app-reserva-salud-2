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

  if (store.currentUser) {
    return <Navigate to='/perfil-paciente' replace />
  } else if (store.currentProfessional) {
    return <Navigate to='/perfil-profesional' replace />
  }

  return (
    <>
      {/*start hero */}
      <div className="flex items-center justify-center min-h-screen bg-base-200">

        <div className="flex flex-col md:flex-row">

          <div
            className="hidden md:flex md:w-1/2 bg-cover bg-center flex-col items-center justify-end p-4 pb-10"
          >
           <img
            src="https://st2.depositphotos.com/1001599/43046/v/450/depositphotos_430460192-stock-illustration-sign-page-abstract-concept-vector.jpg"
            className="img-fluid object-cover mix-blend-multiply w-full h-auto"
            style={{ width: "100%", height: "auto" }}
          />
            <p className="hidden md:block text-black text-center -mt-10">
              ¿Aún no tienes cuenta?
              <Link to={"/nuevo-registro"} className="text-primary -mt-10 ml-1">
                Regístrate
              </Link>
            </p>
          </div>
          <div className="w-full md:w-1/2 lg:max-w-lg p-6 lg:p-8 mx-auto relative">

            <div
              className="absolute inset-0 md:hidden bg-cover bg-center opacity-20"
              style={{
                backgroundImage: "url('https://st2.depositphotos.com/1001599/43046/v/450/depositphotos_430460192-stock-illustration-sign-page-abstract-concept-vector.jpg')"
                
              }}
            ></div>
            <div className=" flex-row-reverse"> 
            <i className="fa-solid fa-circle-user fa-3x"></i>
            </div> 
            <h1 className="text-3xl lg:text-4xl font-bold">
              Inicia sesion ahora!
            </h1>
            <p className="text-base lg:text-lg mt-4">
              Al ingresar a app Reserva Salud, podrás buscar un profesional en tu departamento,
              tendrás amplía disponibildiad horaria para agendar una consulta.
            </p>

            <form className="space-y-4 z-10 relative">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="email"
                  className="input input-bordered w-full"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  placeholder="password"
                  className="input input-bordered w-full"
                  required
                />
                <p className='text-label text-center'>¿Olvidaste tu contraseña?
                  <Link onClick={abrirModal} className='text-primary'> Restablecer</Link></p>
                {mostrarModal && <ModalRestablecerClave cerrarModal={cerrarModal} />}


              </div>
              <div className="form-control mt-6">
                <button className="btn btn-primary w-full">Ingresar</button>
                <p className="md:hidden text-black text-center mt-3">
                  ¿Aún no tienes cuenta?
                  <Link to={"/nuevo-registro"} className="text-primary ml-1">
                    Regístrate
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* end hero */}
    </>
  )
}