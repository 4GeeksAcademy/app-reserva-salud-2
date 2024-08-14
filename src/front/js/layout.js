import React, { useContext } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Home } from "./pages/Home.jsx";
import { VistaRegistro } from "./pages/RegistroUsuario.jsx";
import { VistaTerminosYCondiciones } from "./pages/TerminosYCondiciones.jsx";
import { VistaRegistroProfesional } from "./pages/RegistroProfesional.jsx";
import { VistaInfoProfesional } from "./pages/InfoProfesional.jsx";
import { VistaPoliticaPrivacidad } from "./pages/PoliticaDePrivacidad.jsx";
import injectContext, { Context } from "./store/appContext";

import { Navbar } from "./component/Navbar.jsx";
import { Footer } from "./component/Footer.jsx";
import { Login } from "./pages/Login.jsx";
import { Profesionales } from "./pages/Profesionales.jsx";
import { ProtectedRoute } from "./component/ProtectedRoute.jsx";
import { Toaster } from "react-hot-toast";
import { AccessCode } from "./pages/AccessCode.jsx";
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
          <Route element={<VistaRegistroProfesional />} path="/registro-profesional" />
          <Route element={<VistaPoliticaPrivacidad />} path="/politica-privacidad" />

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
          <Route element={<AccessCode />} path="/access-code" />
          <Route element={<PerfilProfesional />} path="/profesional/perfil" />
          <Route element={<h1>Not found!</h1>} />
        </Routes>
        <Footer />
      </BrowserRouter>
      <Toaster />
    </div>
  );
};

export default injectContext(Layout);
