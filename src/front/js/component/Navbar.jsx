import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export function Navbar() {
  const { store, actions } = useContext(Context);

  return (
    <nav className="navbar fixed-top navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <Link className="navbar-brand" to={"/"}>
          Reserva Salud
        </Link>
        <button
          className="navbar-toggler"
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
                className={`nav-link ${({ isActive }) =>
                  isActive ? "active" : ""}`}
                to={"/"}
              >
                Inicio
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${({ isActive }) =>
                  isActive ? "active" : ""}`}
                to={"/profesionales"}
              >
                Profesionales
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${({ isActive }) =>
                  isActive ? "active" : ""}`}
                to={"/contacto"}
              >
                Contacto
              </Link>
            </li>
            {store.isAuthenticated && (
              <li className="nav-item">
                <Link
                  className={`nav-link ${({ isActive }) =>
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
                    className="btn text-white text-btn bg-danger"
                    onClick={() => {
                      actions.logout();
                      return <Navigate to="/" replace />;
                    }}
                  >
                    <i className="fa-solid fa-arrow-right-to-bracket"></i> Salir
                  </button>
                )
                : (
                  <Link to={"/login"}>
                    <button className="btn text-white text-btn bg-primary">
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
