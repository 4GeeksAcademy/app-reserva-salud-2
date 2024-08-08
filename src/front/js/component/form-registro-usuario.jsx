import React from "react";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import "../../styles/home.css";
import { Link } from "react-router-dom";

export const RegistroUsuario = () => {
    const formik = useFormik({
        initialValues: {
            nombre: '',
            apellido: "",
            fecha_de_nacimiento: "",
            email: "",
            contraseña: "",
            check: false,
        },
        validationSchema: Yup.object({
            nombre: Yup.string()
                .required('Este campo es obligatorio'),
            apellido: Yup.string()
                .required('Este campo es obligatorio'),
            fecha_de_nacimiento: Yup.string()
                .required('Este campo es obligatorio'),
            email: Yup.string()
                .email('Dirección de email inválida')
                .required('Este campo es obligatorio'),
            contraseña: Yup.string()
                .required('Este campo es obligatorio')
                .min(6, 'Debe tener como mínimo 6 caracteres'),
            check: Yup.boolean()
                .oneOf([true], 'Debe aceptar los términos y condiciones para continuar')
                .required('Debe '),
        }),
        onSubmit: values => {
            console.log(values.nombre, values.apellido, values.fecha_de_nacimiento, values.email, values.contraseña, values.check);
        },
    });

    return (
        <div className="container contenido py-4">
            <div className="row bg-secondary text-white p-3 mx-0 mt-2 rounded-top row align-items-center">
                <div className="col-8">
                    <h1 className="text-title mb-1">Registro</h1>
                    <p className="text-normal">Regístrate e ingresa hoy mismo</p>
                </div>
                <div className="col text-end">
                    <i className="fa-solid fa-circle-user display-1"></i>
                </div>
            </div>
            <form className="bg-tertiary p-2 rounded-bottom" onSubmit={formik.handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="nombre" className="text-label">Nombre</label>
                    <input type="text" name="nombre" className="form-control" id="nombre" aria-describedby="nombre" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.nombre} />
                    {formik.touched.nombre && formik.errors.nombre ? (
                        <div className="text-primary">{formik.errors.nombre}</div>
                    ) : null}
                </div>
                <div className="mb-3">
                    <label htmlFor="apellido" className="text-label">Apellido</label>
                    <input type="text" name="apellido" className="form-control" id="apellido" aria-describedby="apellido" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.apellido} />
                    {formik.touched.apellido && formik.errors.apellido ? (
                        <div className="text-primary">{formik.errors.apellido}</div>
                    ) : null}
                </div>
                <div className="mb-3">
                    <label htmlFor="fecha_de_nacimiento" className="text-label"> Fecha de nacimiento</label>
                    <input type="date" name="fecha_de_nacimiento" className="form-control" id="fecha_de_nacimiento" aria-describedby="fecha_de_nacimiento" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.fecha_de_nacimiento} />
                    {formik.touched.fecha_de_nacimiento && formik.errors.fecha_de_nacimiento ? (
                        <div className="text-primary">{formik.errors.fecha_de_nacimiento}</div>
                    ) : null}
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="text-label">Email</label>
                    <input type="email" name="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} />
                    {formik.touched.email && formik.errors.email ? (
                        <div className="text-primary">{formik.errors.email}</div>
                    ) : null}
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="text-label">Contraseña</label>
                    <input type="password" name="contraseña" className="form-control" id="exampleInputPassword1" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.contraseña} />
                    {formik.touched.contraseña && formik.errors.contraseña ? (
                        <div className="text-primary">{formik.errors.contraseña}</div>
                    ) : null}
                </div>
                <div className="mb-3 form-check">
                    <input type="checkbox" name="check" className="form-check-input" id="exampleCheck1"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        checked={formik.values.check}
                    />
                    <label className="text-label" htmlFor="exampleCheck1">He leído los <Link className="link-underline-primary" to="/terminos-y-condiciones">términos y condiciones</Link> </label>
                    {formik.touched.check && formik.errors.check ? (
                        <div className="text-primary">{formik.errors.check}</div>
                    ) : null}
                </div>
                <div className="d-flex justify-content-center">
                    <button type="submit" className="btn bg-primary text-white"><i className="fa-solid fa-user-plus"></i> Registrarse</button>
                </div>
                <div className="mt-3 d-flex justify-content-center">
                    <p>¿Ya tienes una cuenta? <span className="fw-bold text-primary">Inicia sesión</span></p>
                </div>
            </form>
        </div>
    )
};