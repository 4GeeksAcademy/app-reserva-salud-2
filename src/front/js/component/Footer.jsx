import React from "react";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="footer bg-neutral text-neutral-content p-10">
      <aside>
        <i className="fa-regular fa-2xl fa-calendar-plus mb-4"></i>
        <p>
          RESERVA SALUD
          <br />
          © Reserva Salud 2024 - All rights reserved
        </p>
      </aside>
      <nav>
        <h6 className="footer-title">Legal</h6>

        <Link to={"/contacto"}>Contacto</Link>
        <Link to={"/terminos-y-condiciones"}>Términos y condiciones</Link>
        <Link to={"/politica-privacidad"}>Política de privacidad</Link>
      </nav>
    </footer>
  );
};
