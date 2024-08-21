import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

export function Navbar() {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();

  return (
    <nav className="navbar fixed-top navbar-expand-lg bg-primary">
      <div className="container-fluid">
        <Link className="navbar-title text-white text-decoration-none" to={"/"}>
          <i className="fa-regular fa-calendar-plus"></i> Reserva Salud
        </Link>
        <button
          className="navbar-toggler text-white bg-secondary"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbar"
          aria-controls="navbar"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <i className="fa-solid fa-bars"></i>
        </button>
        <div className="collapse navbar-collapse" id="navbar">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link
                className={`text-white text-normal nav-link ${({ isActive }) =>
                  isActive ? "active" : ""}`}
                to={"/"}
              >
                Inicio
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`text-white text-normal nav-link ${({ isActive }) =>
                  isActive ? "active" : ""}`}
                to={"/profesionales"}
              >
                Profesionales
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`text-white text-normal nav-link ${({ isActive }) =>
                  isActive ? "active" : ""}`}
                to={"/contacto"}
              >
                Contacto
              </Link>
            </li>
            {store.isAuthenticated && (
              <li className="nav-item">
                <Link
                  className={`nav-link text-white text-normal ${({ isActive }) =>
                    isActive ? "active" : ""}`}
                  to={"/perfil"}
                >
                  Perfil
                </Link>
              </li>
            )}

            {
              store.isAuthenticated
                ? (
                  <button
                    className="btn text-primary text-btn bg-tertiary"
                    onClick={() => {
                      actions.logout();
                      navigate("/");
                    }}
                  >
                    <i className="fa-solid fa-arrow-right-to-bracket"></i> Salir
                  </button>
                )
                : (
                  <Link to={"/login"}>
                    <button className="btn text-white text-btn bg-secondary">
                      <i className="fa-solid fa-arrow-right-to-bracket"></i> Ingresar
                    </button>
                  </Link>
                )
            }
          </ul>
        </div>
      </div>
    </nav>
  );
}
