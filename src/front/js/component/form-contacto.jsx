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
        <div >
        <div className="hero min-h-screen" style={{
            backgroundImage: "url(https://www.sivsa.com/site/wp-content/uploads/2018/04/stethoscope-2617700_1280-1024x682.jpg)",
        }}>
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                    <form className="card-body">
                        <div className="text-center lg:text-left">
                            <h1 className="text-5xl font-bold">Contáctate con nosotros</h1>
                            <p className="py-6">
                                <p className="text-label text-secondary fw-semibold">Otras formas de contactarnos</p>
                                <p className="text-primary text-normal fw-bold mb-0"><i className="fa-solid fa-envelope"></i> Email:</p>
                                <p className="text-label">contacto@reservasalud.com</p>
                                <p className="text-primary text-normal fw-bold mb-0"><i className="fa-brands fa-square-instagram"></i> Instagram</p>
                                <p className="text-label">ReservaSalud</p>
                                <p className="text-primary text-normal fw-bold mb-0"><i className="fa-brands fa-linkedin"></i> Linkedin</p>
                                <p className="text-label">Reserva Salud</p>
                            </p>
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" placeholder="email" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="password" placeholder="password" className="input input-bordered" required />
                            <label className="label">
                                <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                            </label>
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn btn-primary">Login</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        </div>
    );
};


// <div className="pt-28 pb-16">
        //     <h1 className="text-center text-title text-primary">Contacto</h1>
        //     <div className="row">
        //         <div className="col-sm-12 col-md-6 mx-3 p-5">
        //             <p className="text-label text-secondary fw-semibold">Contáctese a través de este formulario:</p>
        //             <form onSubmit={enviarEmail}>
        //                 <div className="mb-3">
        //                     <label className="text-label">Nombre</label>
        //                     <input type="text" className="form-control" id="nombre" name="nombre" aria-describedby="nombre" />
        //                 </div>
        //                 <div className="mb-3">
        //                     <label className="text-label">Correo Electrónico</label>
        //                     <input type="email" className="form-control" id="correo_electronico" name="correo_electronico" />
        //                 </div>
        //                 <div className="mb-3">
        //                     <label className="text-label">Mensaje</label>
        //                     <textarea id="mensaje" name="mensaje" rows="4" cols="50" className="form-control" />
        //                 </div>
        //                 <button type="submit" className="btn btn-primary">Enviar</button>
        //             </form>
        //         </div>
        //         <div className="col container">
        //             <div className="bg-gray p-3 m-5 h-75" >
        //                 <p className="text-label text-secondary fw-semibold">Otras formas de contactarnos</p>
        //                 <p className="text-primary text-normal fw-bold mb-0"><i className="fa-solid fa-envelope"></i> Email:</p>
        //                 <p className="text-label">contacto@reservasalud.com</p>
        //                 <p className="text-primary text-normal fw-bold mb-0"><i className="fa-brands fa-square-instagram"></i> Instagram</p>
        //                 <p className="text-label">ReservaSalud</p>
        //                 <p className="text-primary text-normal fw-bold mb-0"><i className="fa-brands fa-linkedin"></i> Linkedin</p>
        //                 <p className="text-label">Reserva Salud</p>
        //             </div>
        //         </div>
        //     </div>
        // </div>