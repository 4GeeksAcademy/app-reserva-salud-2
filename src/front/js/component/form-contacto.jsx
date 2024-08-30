import React from "react";
import emailjs from "emailjs-com";
import "../../styles/home.css";
import toast from "react-hot-toast";

export const FormContacto = () => {
    const enviarEmail = (e) => {
        e.preventDefault();

        emailjs.sendForm("service_kpmxqe2", "template_hjbtiki", e.target, "SKitr_wXakQ1aObmk")
            .then((result) => {
                console.log(result.text);
                toast.success("Mensaje enviado con éxito", { icon: "👋" });
            }, (error) => {
                console.log(error.text);
                toast.error("Error al enviar el mensaje");
            });

        e.target.reset();
    };

    return (
        <div className="contenido">
            <h1 className="text-center text-title text-primary">Contacto</h1>
            <div className="row">
                <div className="col-sm-12 col-md-6 mx-3 p-5">
                    <p className="text-label text-secondary fw-semibold">Contáctese a través de este formulario:</p>
                    <form onSubmit={enviarEmail}>
                        <div className="mb-3">
                            <label className="text-label">Nombre</label>
                            <input type="text" className="form-control" id="nombre" name="nombre" aria-describedby="nombre" />
                        </div>
                        <div className="mb-3">
                            <label className="text-label">Correo Electrónico</label>
                            <input type="email" className="form-control" id="correo_electronico" name="correo_electronico" />
                        </div>
                        <div className="mb-3">
                            <label className="text-label">Mensaje</label>
                            <textarea id="mensaje" name="mensaje" rows="4" cols="50" className="form-control" />
                        </div>
                        <button type="submit" className="btn btn-primary">Enviar</button>
                    </form>

                </div>
                <div className="col container">
                    <div className="bg-gray p-3 m-5 h-75" >
                        <p className="text-label text-secondary fw-semibold">Otras formas de contactarnos</p>
                        <p className="text-primary text-normal fw-bold mb-0"><i className="fa-solid fa-envelope"></i> Email:</p>
                        <p className="text-label">contacto@reservasalud.com</p>
                        <p className="text-primary text-normal fw-bold mb-0"><i className="fa-brands fa-square-instagram"></i> Instagram</p>
                        <p className="text-label">ReservaSalud</p>
                        <p className="text-primary text-normal fw-bold mb-0"><i className="fa-brands fa-linkedin"></i> Linkedin</p>
                        <p className="text-label">Reserva Salud</p>
                    </div>
                </div>
            </div>
        </div>
    );
};