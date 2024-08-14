import React, { useContext } from "react";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import "../../styles/index.css";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const RegistroProfesional = () => {
    const { actions } = useContext(Context);

    const formik = useFormik({
        initialValues: {
            first_name: "",
            last_name: "",
            email: "",
            password: "",
            state: "",
            birth_date: "",
            telephone: "",
            title: "",
            profile_picture: "https://avatar.iran.liara.run/public/boy",
            url_calendly: "",
            is_active: false,
        },
        validationSchema: Yup.object({
            first_name: Yup.string()
                .required('Este campo es obligatorio'),
            last_name: Yup.string()
                .required('Este campo es obligatorio'),
            email: Yup.string()
                .email('Dirección de email inválida')
                .required('Este campo es obligatorio'),
            password: Yup.string()
                .min(8, 'La contraseña debe tener al menos 8 caracteres')
                .required('Este campo es obligatorio'),
            state: Yup.string()
                .oneOf([
                    "",
                    "ARTIGAS",
                    "CANELONES",
                    "CERRO_LARGO",
                    "COLONIA",
                    "DURAZNO",
                    "FLORES",
                    "FLORIDA",
                    "LAVALLEJA",
                    "MALDONADO",
                    "MONTEVIDEO",
                    "PAYSANDU",
                    "RIO_NEGRO",
                    "RIVERA",
                    "ROCHA",
                    "SALTO",
                    "SAN_JOSE",
                    "SORIANO",
                    "TACUAREMBO",
                    "TREINTA_Y_TRES"
                ], 'Debe seleccionar un departamento válido'),
            birth_date: Yup.string()
                .required('Este campo es obligatorio'),
            telephone: Yup.string()
                .required('Este campo es obligatorio'),
            title: Yup.string()
                .required('Este campo es obligatorio'),
            profile_picture: Yup.string()
                .url("Debe ser una url válida"),
            url_calendly: Yup.string()
                .url("Debe ser una url válida"),
            is_active: Yup.bool()
        }),
        onSubmit: async (values) => {
            console.log(values)

            try {
                await actions.createProfessional(values);
            } catch (error) {
                console.log(error);
            }
        },
    });

    return (
        <div className="contenido container mb-5">
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
                    <label htmlFor="first_name" className="text-label">Nombre</label>
                    <input type="text" name="first_name" className="form-control" id="first_name" aria-describedby="first_name" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.first_name} />
                    {formik.touched.first_name && formik.errors.first_name ? (
                        <div className="text-primary">{formik.errors.first_name}</div>
                    ) : null}
                </div>
                <div className="mb-3">
                    <label htmlFor="last_name" className="text-label">Apellido</label>
                    <input type="text" name="last_name" className="form-control" id="last_name" aria-describedby="last_name" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.last_name} />
                    {formik.touched.last_name && formik.errors.last_name ? (
                        <div className="text-primary">{formik.errors.last_name}</div>
                    ) : null}
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="text-label">Email</label>
                    <input type="email" name="email" className="form-control" id="email" aria-describedby="emailHelp" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} />
                    {formik.touched.email && formik.errors.email ? (
                        <div className="text-primary">{formik.errors.email}</div>
                    ) : null}
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="text-label">Contraseña</label>
                    <input type="password" name="password" className="form-control" id="password" aria-describedby="password" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.password} />
                    {formik.touched.password && formik.errors.password ? (
                        <div className="text-primary">{formik.errors.password}</div>
                    ) : null}
                </div>
                <div className="mb-3">
                    <label htmlFor="state" className="text-label">Departamento</label>
                    <select className="form-select" id="state" name="state" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.state}>

                        <option value="ARTIGAS">Artigas</option>
                        <option value="CANELONES">Canelones</option>
                        <option value="CERRO_LARGO">Cerro Largo</option>
                        <option value="COLONIA">Colonia</option>
                        <option value="DURAZNO">Durazno</option>
                        <option value="FLORES">Flores</option>
                        <option value="FLORIDA">Florida</option>
                        <option value="LAVALLEJA">Lavalleja</option>
                        <option value="MALDONADO">Maldonado</option>
                        <option value="MONTEVIDEO">Montevideo</option>
                        <option value="PAYSANDU">Paysandú</option>
                        <option value="RIO_NEGRO">Río Negro</option>
                        <option value="RIVERA">Rivera</option>
                        <option value="ROCHA">Rocha</option>
                        <option value="SALTO">Salto</option>
                        <option value="SAN_JOSE">San José</option>
                        <option value="SORIANO">Soriano</option>
                        <option value="TACUAREMBO">Tacuarembó</option>
                        <option value="TREINTA_Y_TRES">Treinta y Tres</option>
                    </select>
                    {formik.touched.state && formik.errors.state ? (
                        <div className="text-primary">{formik.errors.state}</div>
                    ) : null}
                </div>
                <div className="mb-3">
                    <label htmlFor="birth_date" className="text-label">Fecha de nacimiento</label>
                    <input type="date" name="birth_date" className="form-control" id="birth_date" aria-describedby="birth_date" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.birth_date} />
                    {formik.touched.birth_date && formik.errors.birth_date ? (
                        <div className="text-primary">{formik.errors.birth_date}</div>
                    ) : null}
                </div>
                <div className="mb-3">
                    <label htmlFor="telephone" className="text-label">Teléfono de contacto</label>
                    <input type="text" name="telephone" className="form-control" id="telephone" aria-describedby="telephone" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.telephone} />
                    {formik.touched.telephone && formik.errors.telephone ? (
                        <div className="text-primary">{formik.errors.telephone}</div>
                    ) : null}
                </div>
                <div className="mb-3">
                    <label htmlFor="profile_picture" className="text-label">Foto de perfil</label>
                    <input type="url" name="profile_picture" className="form-control" id="profile_picture" aria-describedby="profile_picture" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.profile_picture} />
                    {formik.touched.profile_picture && formik.errors.profile_picture ? (
                        <div className="text-primary">{formik.errors.profile_picture}</div>
                    ) : null}
                </div>
                <div className="mb-3">
                    <label htmlFor="url_calendly" className="text-label">URL de Calendly</label>
                    <input type="url" name="url_calendly" className="form-control" id="url_calendly" aria-describedby="url_calendly" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.url_calendly} />
                    {formik.touched.url_calendly && formik.errors.url_calendly ? (
                        <div className="text-primary">{formik.errors.url_calendly}</div>
                    ) : null}
                </div>
                <hr />
                <div className="mb-3">
                    <label htmlFor="title" className="text-label">Título</label>
                    <select className="form-select" id="title" name="title" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.title}>
                        <option value="">Seleccione un título</option>
                        <option value="psicologia">Psicología</option>
                        <option value="odontologia">Odontología</option>
                        <option value="nutricion">Nutrición</option>
                    </select>
                    {formik.touched.title && formik.errors.title ? (
                        <div className="text-primary">{formik.errors.title}</div>
                    ) : null}
                </div>
                <div className="mb-3">
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" name="is_active" id="is_active" onChange={formik.handleChange} onBlur={formik.handleBlur} checked={formik.values.is_active} />
                        <label className="form-check-label" htmlFor="is_active">
                            ¿Activo?
                        </label>
                    </div>
                    {formik.touched.is_active && formik.errors.is_active ? (
                        <div className="text-primary">{formik.errors.is_active}</div>
                    ) : null}
                </div>
                <div className="d-flex justify-content-center">
                    <button type="submit" className="btn bg-primary text-white"><i className="fa-solid fa-user-plus"></i> Registrarse</button>
                </div>
                <div className="mt-3 d-flex justify-content-center">
                    <p>¿Ya tienes una cuenta? <Link className="link-underline-primary" to="/"> Inicia sesión</Link></p>
                </div>
            </form>
        </div>
    );
};
