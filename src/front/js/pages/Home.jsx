import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { Link } from "react-router-dom";

export const Home = () => {
  const { store, actions } = useContext(Context);

  const handleVerifyEmail = async () => {
    const email = store.currentUser?.email;
    if (email) {
      await actions.verifyEmail(email);
    } else {
      console.error("Email de usuario no encontrado.");
    }
  };

  return (
    <>
      {/* Lo muestra solo si el usuario está logueado y is_active=False */}
      {store.currentUser && !store.currentUser.is_active && (
        <div role="alert" className="alert alert-info">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="h-6 w-6 shrink-0 stroke-current">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>

          <p>
            ¡Hola, {store.currentUser.first_name}! Parece que no has verificado tu
            email.
            ¡Activa tu cuenta! Presiona aquí para verificar tu email:{" "}
          </p>
          <a onClick={handleVerifyEmail} className="link">
            Activar cuenta
          </a>
        </div>
      )}
      {/* Hero */}
      <div
        className="hero min-h-screen"
        style={{
          backgroundImage: "url(https://c.pxhere.com/images/b3/dd/5be747f89840a4c3c64db3d8fa23-1571981.jpg!d)",
        }}>
        <div className="hero-overlay bg-opacity-80"></div>
        <div className="hero-content text-neutral-content text-center">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold">Reserva tu cita médica en línea, fácil y rápido</h1>
            <p className="mb-5">
              Encuentra al profesional que necesitas y agenda tu consulta en
              cuestión de minutos
            </p>
            <Link to="/nuevo-registro" className="btn btn-primary"><i className="fa-solid fa-user-plus"></i> Registrate</Link>
          </div>
        </div>
      </div>
      {/* Fin Hero */}

      <div className="container flex flex-col items-center gap-y-10 mx-auto px-4 mt-4">
        {/* Sección Beneficios */}
        <section className="mx-auto">

          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-2">
            <div className="card bg-base-100 shadow">
              <div className="card-body text-center">
                <i className="fa-solid fa-bolt"></i>
                <h2 className="card-title justify-center">Rapidez</h2>
                <p>Reserva en menos de 5 minutos</p>
              </div>
            </div>

            <div className="card bg-base-100 shadow">
              <div className="card-body text-center">
                <i className="fa-solid fa-house"></i>
                <h2 className="card-title justify-center">Comodidad</h2>
                <p>Desde la comodidad de tu hogar</p>
              </div>
            </div>

            <div className="card bg-base-100 shadow">
              <div className="card-body text-center">
                <i className="fa-solid fa-circle-nodes"></i>
                <h2 className="card-title justify-center">Amplia red de profesionales</h2>
                <p>Encuentra una amplia variedad de profesionales del ámbito de la
                  salud</p>
              </div>
            </div>

            <div className="card bg-base-100 shadow">
              <div className="card-body text-center">
                <i className="fa-solid fa-circle-nodes"></i>
                <h2 className="card-title justify-center">Confidencialidad</h2>
                <p>Tus datos están seguros</p>
              </div>
            </div>

          </div>


          <article className="prose text-center">
            <h2>Beneficios</h2>

            <div className="d-flex flex-column align-items-center gap-1">
              <i className="fa-solid fa-bolt"></i>
              <h3 className="text-subtitle">Rapidez</h3>
              <p className="text-normal">Reserva en menos de 5 minutos</p>
            </div>


          </article>
          <div className="container text-primary">
            <div className="d-flex flex-column flex-md-row align-items-center justify-content-center gap-4">

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

        <section className="container-fluid bg-gray py-4 my-5 text-center shadow-md">
          <div className="container text-primary">
            <div className="row">
              <div className="col-md-6 px-3">
                <h2 className="text-title text-primary mt-5">Misión</h2>
                <p className="text-normal text-start">Nuestra misión es conectar a profesionales de la salud con sus
                  pacientes de manera directa, ofreciendo una plataforma sencilla y eficiente que facilita la gestión de
                  citas, la comunicación y el pago de servicios.</p>
                <p className="text-normal text-start">Nos enfocamos en brindar una experiencia transparente y
                  segura, garantizando la protección de los datos personales y asegurando la satisfacción tanto de los
                  profesionales como de los pacientes.</p>
              </div>
              <div className="col-md-6">
                <img
                  className="img-fluid"
                  style={{ width: '300px', height: '300px' }}
                  src="https://cdni.iconscout.com/illustration/premium/thumb/man-booking-online-appointment-illustration-download-in-svg-png-gif-file-formats--booked-people-with-appointments-pack-illustrations-3485596.png"
                  alt="Illustration"
                />
              </div>
              <div className="col-md-6">
                <img
                  className="img-fluid"
                  src="https://cdni.iconscout.com/illustration/premium/thumb/woman-schedules-an-appointment-meeting-illustration-download-in-svg-png-gif-file-formats--business-schedule-calendar-planning-time-management-people-with-appointments-pack-illustrations-3485589.png?f=webp  "
                  alt="Illustration"
                />
              </div>
              <div className="col-md-6 px-3">
                <h2 className="text-title text-primary mt-5">Visión</h2>
                <p className="text-normal text-start">Aspiramos a ser la plataforma líder en la gestión de citas y servicios de
                  salud en línea en Uruguay, reconocida por su eficiencia, facilidad de uso y
                  compromiso con la seguridad y privacidad de nuestros usuarios.</p>
                <p className="text-normal text-start">Queremos
                  transformar la manera en que los pacientes acceden a los servicios de salud,
                  promoviendo un modelo más directo, accesible y personalizado, con la posibilidad
                  de acceder a consultas a distancia de forma segura.</p>
              </div>
            </div>
          </div>
        </section >


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
                    Sí, es posible tener reservadas varias citas, siempre y cuando
                    no coincidan en día y horario. Podrás ver todas tus citas agendadas en tu cuenta.
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
                    ¿Puedo cancelar o reprogramar una cita?
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
                    Es muy sencillo. Solo tienes que seleccionar el o la profesional
                    o servicio que necesitas, hacer click en reservar y
                    seguir los pasos indicados en el formulario de reserva.
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
                    ¿Qué formas de pago aceptan?
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
                    redes de cobranza.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div >
    </>
  );
};
