import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Home } from "./pages/Home.jsx";
import { VistaRegistro } from "./pages/RegistroUsuario.jsx";
import { VistaTerminosYCondiciones } from "./pages/TerminosYCondiciones.jsx";
import { VistaRegistroProfesional } from "./pages/RegistroProfesional.jsx";
import injectContext from "./store/appContext";

import { Navbar } from "./component/Navbar.jsx";
import { Footer } from "./component/Footer.jsx";

//create your first component
const Layout = () => {
  //the basename is used when your project is published in a subdirectory and not in the root of the domain
  // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
  const basename = process.env.BASENAME || "";

  return (
    <div>
      <BrowserRouter basename={basename}>
        <Navbar />
        <Routes>
          <Route element={<Home />} path="/" />
          <Route element={<VistaRegistro />} path="/registro-usuario" />
          <Route element={<VistaRegistroProfesional />} path="/registro-profesional" />
          <Route
            element={<VistaTerminosYCondiciones />}
            path="/terminos-y-condiciones"
          />
          <Route element={<h1>Not found!</h1>} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
};

export default injectContext(Layout);
