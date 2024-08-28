import React, { useContext } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Home } from "./pages/Home.jsx";
import { VistaRegistro } from "./pages/RegistroUsuario.jsx";
import { VistaTerminosYCondiciones } from "./pages/TerminosYCondiciones.jsx";
import { VistaInfoProfesional } from "./pages/InfoProfesional.jsx";
import { VistaPoliticaPrivacidad } from "./pages/PoliticaDePrivacidad.jsx";
import { VistaContacto } from "./pages/Contacto.jsx";
import { AgendaProfesional } from "./pages/AgendaProfesional.jsx";

import { VistaRestablecerClave } from "./pages/RestablecerClave.jsx";

import { VistaNuevoRegistroUnificado } from "./pages/NuevoRegistroUnificado.jsx";
import { VistaNuevoRegistroPaciente } from "./pages/NuevoRegistroPaciente.jsx";
import { VistaPerfilPaciente } from "./pages/PerfilPacienteProvisorio.jsx";
import { VistaNuevoRegistroProfesional } from "./pages/NuevoRegistroProfesional.jsx";
import { VistaPerfilProfesional } from "./pages/PerfilProfesionalProvisorio.jsx";
import { Paciente } from "./pages/DatosPaciente.jsx";
import { DisponibilidadProfesional } from "./pages/DisponibilidadProfesional.jsx";
import injectContext, { Context } from "./store/appContext";

import { Navbar } from "./component/Navbar.jsx";
import { Footer } from "./component/Footer.jsx";
import { Login } from "./pages/Login.jsx";
import { Profesionales } from "./pages/Profesionales.jsx";
import { ProtectedRoute } from "./component/ProtectedRoute.jsx";
import { Toaster } from "react-hot-toast";
import { PerfilProfesional } from "./pages/PerfilProfesional.jsx";

//create your first component
const Layout = () => {
  //the basename is used when your project is published in a subdirectory and not in the root of the domain
  // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
  const basename = process.env.BASENAME || "";

  const { store } = useContext(Context);

  return (
    <div>
      <BrowserRouter basename={basename}>
        <Navbar />
        <Routes>
          <Route element={<Home />} path="/" />
          <Route element={<VistaRegistro />} path="/registro-usuario" />
          <Route element={<VistaPoliticaPrivacidad />} path="/politica-privacidad" />
          <Route element={<VistaContacto />} path="/contacto" />

          <Route element={<VistaPerfilPaciente />} path="/perfil-paciente" />

          <Route element={<VistaPerfilProfesional />} path="/perfil-profesional" />
          <Route element={<DisponibilidadProfesional />} path="/disponibilidad" />
          <Route element={<ProtectedRoute element={<AgendaProfesional />} />} path="/agenda/:id" />

          {/* Pruebas */}
          <Route element={<VistaNuevoRegistroUnificado />} path="/nuevo-registro" />
          <Route element={<VistaNuevoRegistroPaciente />} path="/nuevo-registro-paciente" />
          <Route element={<VistaNuevoRegistroProfesional />} path="/nuevo-registro-profesional" />

          <Route element={<Paciente />} path="/datos-paciente" />
          <Route element={<Login />} path="/login" />
          <Route
            path="/perfil"
            element={
              <ProtectedRoute element={<h1 className="mt-5">Perfil</h1>} />
            }
          />
          <Route element={<VistaInfoProfesional />} path="/profesionales/:id" />
          <Route element={<VistaTerminosYCondiciones />} path="/terminos-y-condiciones" />
          <Route element={<Profesionales />} path="/profesionales" />
          <Route element={<PerfilProfesional />} path="/profesional/perfil" />
          <Route element={<VistaRestablecerClave />} path="/restablecer" />
          <Route element={<h1>Not found!</h1>} />
        </Routes>
        <Footer />
      </BrowserRouter>
      <Toaster />
    </div>
  );
};

export default injectContext(Layout);
