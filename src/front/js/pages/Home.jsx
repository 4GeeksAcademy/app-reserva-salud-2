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
        <div className="hero-overlay bg-opacity-85"></div>
        <div className="hero-content text-neutral-content text-center flex-col lg:flex-row">
          <div className="max-w-lg">
            <h1 className="mb-5 text-4xl font-bold">Reserva tu cita médica en línea, fácil y rápido</h1>
            <p className="text-lg mb-5">
              Encuentra al profesional que necesitas y agenda tu consulta en
              cuestión de minutos
            </p>
            <Link to="/nuevo-registro" className="btn btn-primary"><i className="fa-solid fa-user-plus"></i> Registrate</Link>
          </div>
        </div>
      </div>
      {/* Fin Hero */}

      <div className="w-full flex flex-col items-center gap-y-12">
        {/* Sección Beneficios */}
        <section className="container mx-auto p-4">

          <h2 className="text-2xl font-bold text-gray-700 text-center mb-6">Beneficios</h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-2">

            <div className="card bg-base-100 w-auto shadow-md">
              <div className="prose card-body text-center">
                <i className="fa-solid fa-bolt"></i>
                <h2 className="card-title justify-center">Rapidez</h2>
                <p>Reserva en menos de 5 minutos</p>
              </div>
            </div>
            <div className="card bg-base-100 shadow-md">
              <div className="prose card-body text-center">
                <i className="fa-solid fa-house"></i>
                <h2 className="card-title justify-center">Comodidad</h2>
                <p>Desde la comodidad de tu hogar</p>
              </div>
            </div>
            <div className="card bg-base-100 shadow-md">
              <div className="prose card-body text-center">
                <i className="fa-solid fa-circle-nodes"></i>
                <h2 className="card-title justify-center">Amplia red de profesionales</h2>
                <p>Encuentra una amplia variedad de profesionales del ámbito de la
                  salud</p>
              </div>
            </div>
            <div className="card bg-base-100 shadow-md">
              <div className="prose card-body text-center">
                <i className="fa-solid fa-circle-nodes"></i>
                <h2 className="card-title justify-center">Confidencialidad</h2>
                <p>Tus datos están seguros</p>
              </div>
            </div>

          </div>

        </section>


        {/* Sección Misión y Visión */}
        <section className="w-full py-8 bg-base-200 text-center">
          <div className="container mx-auto px-4">
            <div className="flex justify-center items-center flex-wrap">
              <div className="w-full md:w-1/2 px-3 order-1">
                <h2 className="text-2xl font-bold text-primary mt-5">Misión</h2>
                <p className="text-base text-start mt-4">
                  Nuestra misión es conectar a profesionales de la salud con sus pacientes de manera directa, ofreciendo una plataforma sencilla y eficiente que facilita la gestión de citas, la comunicación y el pago de servicios.
                </p>
                <p className="text-base text-start mt-4">
                  Nos enfocamos en brindar una experiencia transparente y segura, garantizando la protección de los datos personales y asegurando la satisfacción tanto de los profesionales como de los pacientes.
                </p>
              </div>
              <div className="w-full max-w-lg md:w-1/2 px-3 order-2">
                <img
                  className="w-full"
                  src="https://cdni.iconscout.com/illustration/premium/thumb/man-booking-online-appointment-illustration-download-in-svg-png-gif-file-formats--booked-people-with-appointments-pack-illustrations-3485596.png"
                  alt="Illustration"
                />
              </div>
              <div className="w-full md:w-1/2 px-3 order-3 md:order-4">
                <h2 className="text-2xl font-bold text-primary mt-5">Visión</h2>
                <p className="text-base text-start mt-4">
                  Aspiramos a ser la plataforma líder en la gestión de citas y servicios de salud en línea en Uruguay, reconocida por su eficiencia, facilidad de uso y compromiso con la seguridad y privacidad de nuestros usuarios.
                </p>
                <p className="text-base text-start mt-4">
                  Queremos transformar la manera en que los pacientes acceden a los servicios de salud, promoviendo un modelo más directo, accesible y personalizado, con la posibilidad de acceder a consultas a distancia de forma segura.
                </p>
              </div>
              <div className="w-full max-w-lg md:w-1/2 px-3 order-4 md:order-3">
                <img
                  className="w-full"
                  src="https://cdni.iconscout.com/illustration/premium/thumb/woman-schedules-an-appointment-meeting-illustration-download-in-svg-png-gif-file-formats--business-schedule-calendar-planning-time-management-people-with-appointments-pack-illustrations-3485589.png"
                  alt="Illustration"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="container">
          <div className="flex flex-col items-center py-4">
            <h2 className="text-2xl font-bold text-gray-700 mb-8">Preguntas Frecuentes</h2>

            <div className="join join-vertical w-full">
              <div className="collapse collapse-arrow join-item bg-base-200">
                <input type="radio" name="faq" />
                <div className="collapse-title text-xl font-medium">
                  ¿Puedo agendar más de una cita a la vez?
                </div>
                <div className="collapse-content">
                  Sí, es posible tener reservadas varias citas, siempre y cuando
                  no coincidan en día y horario. Podrás ver todas tus citas agendadas en tu cuenta.
                </div>
              </div>

              <div className="collapse collapse-arrow join-item bg-base-200">
                <input type="radio" name="faq" />
                <div className="collapse-title text-xl font-medium">
                  ¿Puedo cancelar una cita?
                </div>
                <div className="collapse-content">
                  Sí, puedes cancelar tu cita a través de nuestro
                  sistema de reservas en línea. Solo debes iniciar sesión con tu
                  cuenta y buscar la cita que deseas cancelar.
                </div>
              </div>

              <div className="collapse collapse-arrow join-item bg-base-200">
                <input type="radio" name="faq" />
                <div className="collapse-title text-xl font-medium">
                  ¿Cómo reservo un servicio?
                </div>
                <div className="collapse-content">
                  Es muy sencillo. Solo tienes que seleccionar el o la profesional
                  o servicio que necesitas, hacer click en reservar y
                  seguir los pasos indicados en el formulario de reserva.
                </div>
              </div>

              <div className="collapse collapse-arrow join-item bg-base-200">
                <input type="radio" name="faq" />
                <div className="collapse-title text-xl font-medium">
                  ¿Qué formas de pago aceptan?
                </div>
                <div className="collapse-content">
                  Utilizamos Mercado Pago como pasarela de pago, por lo que
                  aceptamos una amplia variedad de tarjetas e incluso pagos por
                  redes de cobranza.
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};
