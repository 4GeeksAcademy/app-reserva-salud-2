import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

export function Navbar() {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();

  return (
    <nav className="navbar bg-neutral text-neutral-content">
      <div className="navbar-start">
        <a href="#" className="btn btn-ghost text-xl">Reserva Salud</a>
      </div>
      <div className="navbar-center">
        <ul className="menu menu-horizontal px-1">
          <li><a>Inicio</a></li>
          <li><a>Profesionales</a></li>
          <li><a>Contacto</a></li>
        </ul>
      </div>
      <div className="navbar-end">
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" alt="Tailwind CSS Navbar component" />
            </div>
          </div>
          <ul tabIndex={0} className="menu menu-sm bg-base-200 text-base-content dropdown-content rounded-box z-1 mt-3 w-52 p-2 shadow">
            <li>
              <a className="justify-between">
                Profile
                <span className="badge">New</span>
              </a>
            </li>
            <li><a>Settings</a></li>
            <li><a>Logout</a></li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
