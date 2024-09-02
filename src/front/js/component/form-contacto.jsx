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
        <div className="min-h-screen flex justify-center items-center bg-gray-100 pt-32 pb-28" style={{
            backgroundImage: "url(https://diariosanrafael.com.ar/wp-content/uploads/2023/09/bg-banner-coseguro2-960x426-1.jpg)",
            backgroundSize: "cover"
        }}>
            <div className="bg-white bg-opacity-90 p-10 rounded-lg shadow-lg max-w-5xl w-full">
                <h1 className="text-5xl font-bold text-center mb-10">Contáctate con nosotros</h1>
                <div className="flex flex-col lg:flex-row justify-between items-start gap-8">
                    <div className="flex-1 max-w-md">
                        <form onSubmit={enviarEmail}>
                            <div className="mb-3">
                                <label className="text-label">Nombre</label>
                                <input type="text" className="input input-bordered w-full" id="nombre" name="nombre" aria-describedby="nombre" />
                            </div>
                            <div className="mb-3">
                                <label className="text-label">Correo Electrónico</label>
                                <input type="email" className="input input-bordered w-full" id="correo_electronico" name="correo_electronico" />
                            </div>
                            <div className="mb-3">
                                <label className="text-label">Mensaje</label>
                                <textarea id="mensaje" name="mensaje" rows="4" cols="50" className="input input-bordered w-full" />
                            </div>
                            <div className="flex justify-center">
                                <button type="submit" className="btn btn-primary">Enviar</button>
                            </div>
                        </form>
                    </div>

                    <div className="flex-1 max-w-md">
                        <h2 className="text-xl font-bold mb-4">Otras formas de contactarnos</h2>
                        <div className="space-y-4">
                            <div>
                                <p className="text-primary font-semibold text-lg mb-0">
                                    <i className="fa-solid fa-envelope"></i> Email:
                                </p>
                                <p className="text-lg">contacto@reservasaluduy.com</p>
                            </div>
                            <div>
                                <p className="text-primary font-semibold text-lg mb-0">
                                    <i className="fa-brands fa-square-instagram"></i> Instagram
                                </p>
                                <p className="text-lg">ReservaSalud</p>
                            </div>
                            <div>
                                <p className="text-primary font-semibold text-lg mb-0">
                                    <i className="fa-brands fa-linkedin"></i> Linkedin
                                </p>
                                <p className="text-lg">Reserva Salud</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
