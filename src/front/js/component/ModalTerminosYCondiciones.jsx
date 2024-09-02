import React from "react";

export const ModalTerminosyCondiciones = ({ cerrarModal, mostrarModal }) => {
    return (
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center ${
          mostrarModal ? "block" : "hidden"
        }`}
        role="dialog"
      >
        <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl max-h-[80vh] overflow-y-auto">
          <div className="flex justify-between items-center p-4 border-b">
            <h1 className="text-lg font-bold">Términos y condiciones</h1>
            <button
              type="button"
              className="text-gray-400 hover:text-gray-600 focus:outline-none"
              onClick={cerrarModal}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div className="p-4 space-y-4">
            <h3 className="text-lg font-semibold">1. Aceptación de los términos</h3>
            <p>
              Al utilizar esta aplicación, usted acepta los términos y condiciones aquí
              establecidos. Estos términos pueden ser modificados en cualquier momento, por lo que
              le recomendamos revisarlos periódicamente.
            </p>
            <h3 className="text-lg font-semibold">2. Uso de la aplicación</h3>
            <p>
              <span className="font-semibold">• Propósito:</span> Esta aplicación está diseñada para
              facilitar la reserva de citas médicas.
            </p>
            <p>
              <span className="font-semibold">• Responsabilidad del Usuario:</span> El usuario es
              responsable de proporcionar información precisa y actualizada al momento de realizar
              una reserva.
            </p>
            <p>
              <span className="font-semibold">• Prohibido:</span> Está prohibido cualquier uso que
              pueda dañar, deshabilitar o interferir en el funcionamiento de la aplicación.
            </p>
            <h3 className="text-lg font-semibold">3. Servicios médicos</h3>
            <p>
              <span className="font-semibold">• No somos proveedores:</span> La aplicación es una
              plataforma que conecta a pacientes con proveedores de servicios médicos. No somos
              responsables por la calidad de los servicios prestados por los proveedores.
            </p>
            <p>
              <span className="font-semibold">• Información médica:</span> La información
              proporcionada por la aplicación tiene fines informativos y no sustituye el consejo
              médico profesional.
            </p>
            <h3 className="text-lg font-semibold">4. Privacidad</h3>
            <p>
              <span className="font-semibold">• Recopilación de datos:</span> Recopilamos información
              personal para poder prestar nuestros servicios.
            </p>
            <p>
              <span className="font-semibold">• Uso de datos:</span> Utilizamos sus datos para
              procesar reservas, enviarle notificaciones y mejorar nuestros servicios.
            </p>
            <p>
              <span className="font-semibold">• Seguridad:</span> Implementamos medidas de seguridad
              para proteger sus datos personales.
            </p>
            <h3 className="text-lg font-semibold">5. Pagos</h3>
            <p>
              <span className="font-semibold">• Formas de pago:</span> Aceptamos las siguientes formas
              de pago: Tarjetas de crédito, tarjetas de débito, redes de cobranza (Abitab, RedPagos).
            </p>
            <p>
              <span className="font-semibold">• Reembolsos:</span> Las políticas de reembolso se
              detallan en nuestra sección de preguntas frecuentes.
            </p>
            <h3 className="text-lg font-semibold">6. Cancelación y reprogramación</h3>
            <p>
              <span className="font-semibold">• Cancelación:</span> Puede cancelar su cita dentro de
              un plazo determinado.
            </p>
            <p>
              <span className="font-semibold">• Reprogramación:</span> Puede reprogramar su cita con
              cierta antelación.
            </p>
            <p>
              <span className="font-semibold">• No presentarse:</span> Si no se presenta a su cita,
              podrían aplicarse cargos.
            </p>
            <h3 className="text-lg font-semibold">7. Limitación de responsabilidad</h3>
            <p>
              No seremos responsables por ningún daño directo, indirecto, incidental o consecuente
              derivado del uso o la imposibilidad de usar esta aplicación.
            </p>
            <h3 className="text-lg font-semibold">8. Ley aplicable</h3>
            <p>Estos términos se rigen por las leyes de Uruguay.</p>
            <h3 className="text-lg font-semibold">9. Contacto</h3>
            <p>
              Para cualquier consulta, comuníquese con nosotros a través de nuestros canales de
              contacto, disponibles en la sección Contacto.
            </p>
          </div>
          <div className="p-4 border-t flex justify-end">
            <button
              type="button"
              className="btn bg-gray-500 text-white hover:bg-gray-600 rounded px-4 py-2"
              onClick={cerrarModal}
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    );
  };
