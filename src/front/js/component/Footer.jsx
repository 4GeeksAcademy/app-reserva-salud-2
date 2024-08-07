import React from "react";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <div className="container-fluid d-flex flex-column align-items-center justify-content-start gap-4 py-2 px-3 bg-secondary">
      <div className="w-100 d-flex justify-content-between">
        <div className="d-flex flex-column gap-1 text-white">
          <h2 className="text-subtitle">Reserva Salud</h2>
          <div className="d-flex gap-1">
            <i className="fa-brands fa-instagram"></i>
            <i className="fa-brands fa-x-twitter"></i>
          </div>
        </div>

        <ul className="nav flex-column text-end">
          <li className="nav-item">
            <Link to={"/contacto"} className="nav-link text-white">
              Contacto
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to={"/terminos-y-condiciones"}
              className="nav-link text-white"
            >
              Términos y condiciones
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to={"/politica-de-privacidad"}
              className="nav-link text-white"
            >
              Política de privacidad
            </Link>
          </li>
        </ul>
      </div>
      <div>
        <small className="text-white">
          © Reserva Salud 2024 - All rights reserved
        </small>
      </div>
    </div>
  );
};
