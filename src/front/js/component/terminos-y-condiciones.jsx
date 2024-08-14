import React from "react";
import "../../styles/home.css";

export const TerminosYCondiciones = () => {
    return (
        <div >
            <div className="contenido p-3">
                <h1 className="text-title mb-3 text-center">Términos y condiciones</h1>
                    <h3 className="text-subtitle">1. Aceptación de los términos</h3>
                        <p className="text-normal">Al utilizar esta aplicación, usted acepta los términos y condiciones aquí establecidos. Estos términos pueden ser modificados en cualquier momento, por lo que le recomendamos revisarlos periódicamente.</p>
                    <h3 className="text-subtitle">2. Uso de la aplicación</h3>
                        <p className="text-normal"> <span className="fw-semibold">• Propósito:</span> Esta aplicación está diseñada para facilitar la reserva de citas médicas.</p>
                        <p className="text-normal"> <span className="fw-semibold">• Responsabilidad del Usuario:</span> El usuario es responsable de proporcionar información precisa y actualizada al momento de realizar una reserva.</p>
                        <p className="text-normal"> <span className="fw-semibold">• Prohibido:</span> Está prohibido cualquier uso que pueda dañar, deshabilitar o interferir en el funcionamiento de la aplicación.</p>
                    <h3 className="text-subtitle">3. Servicios médicos</h3>
                        <p className="text-normal"> <span className="fw-semibold">• No somos proveedores:</span> La aplicación es una plataforma que conecta a pacientes con proveedores de servicios médicos. No somos responsables por la calidad de los servicios prestados por los proveedores.</p>
                        <p className="text-normal"> <span className="fw-semibold">• Información médica:</span> La información proporcionada por la aplicación tiene fines informativos y no sustituye el consejo médico profesional.</p>
                    <h3 className="text-subtitle">4. Privacidad</h3>
                        <p className="text-normal"> <span className="fw-semibold">• Recopilación de datos:</span> Recopilamos información personal para poder prestar nuestros servicios.</p>
                        <p className="text-normal"> <span className="fw-semibold">• Uso de datos:</span> Utilizamos sus datos para procesar reservas, enviarle notificaciones y mejorar nuestros servicios.</p>
                        <p className="text-normal"> <span className="fw-semibold">• Seguridad:</span> Implementamos medidas de seguridad para proteger sus datos personales.</p>
                    <h3 className="text-subtitle">5. Pagos</h3>
                        <p className="text-normal"> <span className="fw-semibold">• Formas de pago:</span> Aceptamos las siguientes formas de pago: Tarjetas de crédito, tarjetas de débito, redes de cobranza (Abitab, RedPagos).</p>
                        <p className="text-normal"> <span className="fw-semibold">• Reembolsos:</span> Las políticas de reembolso se detallan en nuestra sección de preguntas frecuentes.</p>
                    <h3 className="text-subtitle">6. Cancelación y reprogramación</h3>
                        <p className="text-normal"> <span className="fw-semibold">• Cancelación:</span> Puede cancelar su cita dentro de un plazo determinado.</p>
                        <p className="text-normal"> <span className="fw-semibold">• Reprogramación:</span> Puede reprogramar su cita con cierta antelación.</p>
                        <p className="text-normal"> <span className="fw-semibold">• No presentarse:</span> Si no se presenta a su cita, podrían aplicarse cargos.</p>
                    <h3 className="text-subtitle">7. Limitación de responsabilidad</h3>
                        <p className="text-normal">No seremos responsables por ningún daño directo, indirecto, incidental o consecuente derivado del uso o la imposibilidad de usar esta aplicación.</p>
                    <h3 className="text-subtitle">8. Ley aplicable</h3>
                        <p className="text-normal">Estos términos se rigen por las leyes de Uruguay.</p>
                    <h3 className="text-subtitle">9. Contacto</h3>
                        <p className="text-normal">Para cualquier consulta, comuníquese con nosotros a través de [Información de contacto].</p>
                </div>
            </div>  
    )
}