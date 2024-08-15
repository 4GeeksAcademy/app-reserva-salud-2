import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { Link } from "react-router-dom";

export const Home = () => {
  const { store, actions } = useContext(Context);

  return (
    <>
      <section className="container" style={{ paddingTop: "64px" }}>
        <div className="d-flex flex-column align-items-center gap-4 py-4">
          <h2 className="text-title text-center">
            Reserva tu cita médica en línea, fácil y rápido
          </h2>
          <p className="text-normal">
            Encuentra al profesional que necesitas y agenda tu consulta en
            cuestión de minutos
          </p>
          <Link
            to={"/registro-usuario"}
            className="text-btn text-white bg-primary btn"
          >
            <i className="fa-solid fa-user-plus"></i> Registrarse
          </Link>
          <button className="btn">Button</button>
          <img
            className="img-fluid max-w-sm"
            src="https://s3-alpha-sig.figma.com/img/ff90/f0d9/9a5bc8f8cd2610b2e82b81f2564ec111?Expires=1724025600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=O3rHVYu10HOub0jcrVBGn3gTnvlMs~7qePd3lB7zYAA4TjZrJT4v3qJr-SI0e8T6pSOvaoGFe9DTuYpbZMfV0vGqThphmFKMhd~yizpaL7A-qDxDxQ~Fm82NEGEdWuZ4qn81KkFgQk-1R16Et2XELsCMFa3uozoOGXjGp1UZrfCbvwzcE0HsFiFtm8KzYgE2wz8h1HZC2jjGBK3Ci0AeI5sGLJHrnpSwC1pZE0-m1tKVfBxG3XLNj~BqTv4ruzKtQJtQyvxYFwdcBLlqNOC8zeuZzFcyyOt4I1P7Ueqd~YM0LW2pid1ACvY0yqw9DupibdUdH4XKF~SGhSJ3Sf4kNA__"
            alt="Illustration"
          />
        </div>
      </section>
      <section className="container-fluid bg-gray py-4 text-center shadow-md">
        <div className="container text-primary">
          <h2 className="text-title mb-4">Beneficios</h2>
          <div className="d-flex flex-column flex-md-row align-items-center justify-content-center gap-4">
            <div className="d-flex flex-column align-items-center gap-1">
              <i className="fa-solid fa-bolt"></i>
              <h3 className="text-subtitle">Rapidez</h3>
              <p className="text-normal">Reserva en menos de 5 minutos</p>
            </div>
            <div className="d-flex flex-column align-items-center gap-1">
              <i className="fa-solid fa-house"></i>
              <h3 className="text-subtitle">Comodidad</h3>
              <p className="text-normal">Desde la comodidad de tu hogar</p>
            </div>
            <div className="d-flex flex-column align-items-center gap-1">
              <i className="fa-solid fa-circle-nodes"></i>
              <h3 className="text-subtitle">Amplia red de profesionales</h3>
              <p className="text-normal">
                Encuentra una amplia variedad de profesionales del ámbito de la
                salud
              </p>
            </div>
            <div className="d-flex flex-column align-items-center gap-1">
              <i className="fa-solid fa-user-shield"></i>
              <h3 className="text-subtitle">Confidencialidad</h3>
              <p className="text-normal">Tus datos están seguros</p>
            </div>
          </div>
        </div>
      </section>
      <section className="container">
        <div className="d-flex flex-column align-items-center py-4">
          <h2 className="text-title">Preguntas Frecuentes</h2>

          <div className="accordion" id="faq">
            <div className="accordion-item">
              <h2 className="accordion-header">
                <button
                  className="accordion-button text-label"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#faq-1"
                  aria-expanded="true"
                  aria-controls="faq-1"
                >
                  ¿Puedo agendar más de una cita a la vez?
                </button>
              </h2>
              <div
                id="faq-1"
                className="accordion-collapse collapse show"
                data-bs-parent="#faq"
              >
                <div className="accordion-body text-normal">
                  Si, es posible tener reservadas varias citas siempre y cuando
                  no coincidan en día y horario
                </div>
              </div>
            </div>
            <div className="accordion-item">
              <h2 className="accordion-header">
                <button
                  className="accordion-button collapsed text-label"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#faq-2"
                  aria-expanded="false"
                  aria-controls="faq-2"
                >
                  ¿Puedo cancelar / reprogramar una cita?
                </button>
              </h2>
              <div
                id="faq-2"
                className="accordion-collapse collapse"
                data-bs-parent="#faq"
              >
                <div className="accordion-body text-normal">
                  Sí, puedes cancelar o reprogramar tu cita a través de nuestro
                  sistema de reservas en línea. Solo debes iniciar sesión con tu
                  cuenta y buscar la cita que deseas modificar.
                </div>
              </div>
            </div>
            <div className="accordion-item">
              <h2 className="accordion-header">
                <button
                  className="accordion-button collapsed text-label"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#faq-3"
                  aria-expanded="false"
                  aria-controls="faq-3"
                >
                  ¿Cómo reservo un servicio?
                </button>
              </h2>
              <div
                id="faq-3"
                className="accordion-collapse collapse"
                data-bs-parent="#faq"
              >
                <div className="accordion-body text-normal">
                  Es muy sencillo. Solo tienes que seleccionar la el profesional
                  o servicio que necesitas,&nbsp;&nbsp;hacer click en reservar y
                  seguir los pasos indicados en el formulario de reserva
                </div>
              </div>
            </div>
            <div className="accordion-item">
              <h2 className="accordion-header">
                <button
                  className="accordion-button collapsed text-label"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#faq-4"
                  aria-expanded="false"
                  aria-controls="faq-4"
                >
                  ¿Que formas de pago aceptan?
                </button>
              </h2>
              <div
                id="faq-4"
                className="accordion-collapse collapse"
                data-bs-parent="#faq"
              >
                <div className="accordion-body text-normal">
                  Utilizamos Mercado Pago como pasarela de pago, por lo que
                  aceptamos una amplia variedad de tarjetas e incluso pagos por
                  redes de cobranza
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
