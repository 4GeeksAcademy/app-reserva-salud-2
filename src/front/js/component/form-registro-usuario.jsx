import React,{useContext} from "react";
import { Context } from "../store/appContext";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import "../../styles/home.css";
import { Link,useNavigate } from "react-router-dom";

export const RegistroUsuario = () => {
    const {store,actions}=useContext(Context);
    const navigate= useNavigate();
    
    const formik = useFormik({
        initialValues: {
            nombre: '',
            apellido: "",
            fechaNacimiento: "",
            email: "",
            password: "",
            check: false,
        },
        validationSchema: Yup.object({
            nombre: Yup.string()
                .required('Este campo es obligatorio'),
            apellido: Yup.string()
                .required('Este campo es obligatorio'),
                fechaNacimiento: Yup.string()
                .required('Este campo es obligatorio'),
            email: Yup.string()
                .email('Dirección de email inválida')
                .required('Este campo es obligatorio'),
                password: Yup.string()
                .required('Este campo es obligatorio')
                .min(6, 'Debe tener como mínimo 6 caracteres'),
            check: Yup.boolean()
                .oneOf([true], 'Debe aceptar los términos y condiciones para continuar')
                .required('Debe '),
        }),
        onSubmit: async (values) => {
            const send_Register_User= await actions.signupUser(values.email,values.password,values.fechaNacimiento,values.nombre,values.apellido)
            console.log(values.nombre, values.apellido, values.fechaNacimiento, values.email, values.password, values.check);
            if(send_Register_User){
                navigate('/Login');
            }
        },
    });

    return (
        <div className="my-4">
            <div className="row bg-secondary text-white p-3 mx-0 rounded-top row align-items-center">
                <div className="col-8">
                    <h1 className="text-title mb-1">Registro</h1>
                    <p className="text-normal">Regístrate e ingresa hoy mismo</p>
                </div>
                <div className="col text-end">
                    <i className="fa-solid fa-circle-user fa-3x"></i>
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
                    <label htmlFor="fechaNacimiento" className="text-label"> Fecha de nacimiento</label>
                    <input type="date" name="fechaNacimiento" className="form-control" id="fechaNacimiento" 
                    aria-describedby="fechaNacimiento" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.fechaNacimiento} 
                    />
                    {formik.touched.fechaNacimiento && formik.errors.fechaNacimiento ? (
                        <div className="text-primary">{formik.errors.fechaNacimiento}</div>
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
                    <input type="password" name="password" className="form-control" 
                    id="exampleInputPassword1" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.password} 
                    />
                    {formik.touched.password && formik.errors.password ? (
                        <div className="text-primary">{formik.errors.password}</div>
                    ) : null}
                </div>
                <div className="mb-3 form-check">
                    <input type="checkbox" name="check" className="form-check-input" id="exampleCheck1"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        checked={formik.values.check}
                    />
                    <label className="text-label" htmlFor="exampleCheck1">He leído los <Link className="text-primary" to={"/terminos-y-condiciones"}>términos y condiciones</Link> </label>
                    {formik.touched.check && formik.errors.check ? (
                        <div className="text-primary">{formik.errors.check}</div>
                    ) : null}
                </div>
                <div className="d-flex justify-content-center">
                    <button type="submit" className="btn bg-primary text-white"><i className="fa-solid fa-user-plus"></i> Registrarse</button>
                </div>
                <div className="mt-3 d-flex justify-content-center">
                    <p>¿Ya tienes una cuenta? <Link to={"/login"} className="fw-bold text-primary">Inicia sesión</Link></p>
                </div>
            </form>
        </div>
    )
};