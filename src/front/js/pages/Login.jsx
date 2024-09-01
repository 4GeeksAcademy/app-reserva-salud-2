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
  
  <div className="flex flex-col md:flex-row bg-base-100 shadow-lg rounded-lg overflow-hidden max-w-4xl w-full">
    
    <div
      className="hidden md:block md:w-1/2 bg-cover bg-center"
      style={{ backgroundImage:"url('https://st2.depositphotos.com/1001599/43046/v/450/depositphotos_430460192-stock-illustration-sign-page-abstract-concept-vector.jpg')"
 }}
    ></div>

   
    <div className="w-full md:w-1/2 p-8 relative">
      
      <div
        className="absolute inset-0 md:hidden bg-cover bg-center opacity-20"
        style={{ backgroundImage: "url('https://st2.depositphotos.com/1001599/43046/v/450/depositphotos_430460192-stock-illustration-sign-page-abstract-concept-vector.jpg')"
            
 }}
      ></div>

      <h1 className="text-4xl md:text-5xl font-bold z-10 relative">
        Login now!
      </h1>
      <p className="py-4 md:py-6 text-sm md:text-base z-10 relative">
        Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
        excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a
        id nisi.
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
          <label className="label">
            <a href="#" className="label-text-alt link link-hover">
              Forgot password?
            </a>
          </label>
        </div>
        <div className="form-control mt-6">
          <button className="btn btn-primary w-full">Login</button>
        </div>
      </form>
    </div>
  </div>
</div>
     
      {/* end hero */}
    </>
  )
}