import React, { useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

export function Navbar() {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();

  return (
    <div className="navbar bg-base-200">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost md:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
            <li>
              <NavLink to="/">
                Inicio
              </NavLink>
            </li>
            <li>
              <NavLink to="/profesionales">
                Profesionales
              </NavLink>
            </li>
            <li>
              <NavLink to="/contacto">
                Contacto
              </NavLink>
            </li>
          </ul>
        </div>
        <a className="btn btn-ghost text-xl">Reserva Salud</a>
      </div>
      <div className="navbar-center hidden md:flex">
        <ul
          tabIndex={0}
          className="menu menu-horizontal gap-1">
          <li>
            <NavLink to="/">
              Inicio
            </NavLink>
          </li>
          <li>
            <NavLink to="/profesionales">
              Profesionales
            </NavLink>
          </li>
          <li>
            <NavLink to="/contacto">
              Contacto
            </NavLink>
          </li>
        </ul>
      </div>
      <div className="navbar-end">
        {
          store.currentUser || store.currentProfessional ? (
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  <img
                    alt="Tailwind CSS Navbar component"
                    src="https://avatar.iran.liara.run/public" />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-2 w-52 p-2 shadow">
                <li>
                  <NavLink to={store.currentUser ? "/perfil-paciente" : store.currentProfessional ? "/perfil-profesional" : ""}>
                    Reservas
                  </NavLink>
                </li>
                {
                  store.currentProfessional && (
                    <li>
                      <NavLink to="/disponibilidad">
                        Disponibilidad
                      </NavLink>
                    </li>
                  )
                }
                <li>
                  <a onClick={() => {
                    actions.logout();
                    navigate("/");
                  }}>Cerrar Sesión</a>
                </li>
              </ul>
            </div>
          ) : (
            <Link to="/login" className="btn btn-primary btn-md">Iniciar Sesión</Link>
          )
        }
      </div>
    </div>
  );
}
