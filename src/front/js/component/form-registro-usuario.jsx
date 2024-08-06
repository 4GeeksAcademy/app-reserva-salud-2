import React, { useContext } from "react";
import { useFormik } from 'formik';
import * as Yup from 'yup';

export const RegistroUsuario = () => {
    const formik = useFormik({
        initialValues: {
            nombre: '',
            apellido: "",
            fecha_de_nacimiento: "",
            email: "",
            contraseña: "",
            check: "",
        },
        validationSchema: Yup.object({
            nombre: Yup.string()
                .required('Required'),
            apellido: Yup.string()
                .required('Required'),
            fecha_de_nacimiento: Yup.string()
                .required('Required'),
            email: Yup.string()
                .email('Dirección de email inválida')
                .required('Required'),
            contraseña: Yup.string()
                .required('Required')
                .min(6, 'Debe tener como mínimo 6 caracteres')
        }),
        onSubmit: values => {
            console.log(JSON.stringify(values, null, 2));
        },
    });

    return (
        <div>
            <h1 className="text-center ">Registro</h1>
            <form className="m-3">
                <div className="mb-3">
                    <label htmlFor="nombre" className="form-label">Nombre</label>
                    <input type="text" name="nombre" className="form-control" id="nombre" aria-describedby="nombre" />
                </div>
                <div className="mb-3">
                    <label htmlFor="apellido" className="form-label">Apellido</label>
                    <input type="text" name="apellido" className="form-control" id="apellido" aria-describedby="apellido" />
                </div>
                <div className="mb-3">
                    <label htmlFor="fecha" className="form-label">Fecha de nacimiento</label>
                    <input type="date" name="fecha_de_nacimiento" className="form-control" id="fecha" aria-describedby="fecha" />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email</label>
                    <input type="email" name="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Contraseña</label>
                    <input type="password" name="contraseña" className="form-control" id="exampleInputPassword1" />
                </div>
                <div className="mb-3 form-check">
                    <input type="checkbox" name="check" className="form-check-input" id="exampleCheck1" />
                    <label className="form-check-label" htmlFor="exampleCheck1">He leído los términos y condiciones</label>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
};