import React from "react";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import "../../styles/index.css";
import { Link } from "react-router-dom";

export const RegistroProfesional = () => {
    const formik = useFormik({
        initialValues: {
            nombre: "",
            apellido: "",
            fecha_de_nacimiento: "",
            genero: "",
            email: "",
            telefono: "",
            foto: "",
            pais_nacimiento: "",
            departamento: "",
            ciudad: "",
            especialidad: "",
            antiguedad: "",
            modalidad: [],
        },
        validationSchema: Yup.object({
            nombre: Yup.string()
                .required('Este campo es obligatorio'),
            apellido: Yup.string()
                .required('Este campo es obligatorio'),
            fecha_de_nacimiento: Yup.date()
                .required('Este campo es obligatorio')
                .max(new Date(), 'Fecha no válida'),
            genero: Yup.string()
                .required('Este campo es obligatorio'),
            email: Yup.string()
                .email('Dirección de email inválida')
                .required('Este campo es obligatorio'),
            telefono: Yup.string()
                .required('Este campo es obligatorio'),
            foto: Yup.string(),
            pais_nacimiento: Yup.string()
                .required('Este campo es obligatorio'),
            departamento: Yup.string()
                .required('Este campo es obligatorio'),
            ciudad: Yup.string()
                .required('Este campo es obligatorio'),

            especialidad: Yup.string()
                .required('Este campo es obligatorio'),
            antiguedad: Yup.string()
                .required('Este campo es obligatorio'),
            modalidad: Yup.array()
                .min(1, 'Debe seleccionar al menos una modalidad'),
        }),
        onSubmit: values => {
            console.log(values);
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
                    <label htmlFor="fecha_de_nacimiento" className="text-label">Fecha de nacimiento</label>
                    <input type="date" name="fecha_de_nacimiento" className="form-control" id="fecha_de_nacimiento" aria-describedby="fecha_de_nacimiento" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.fecha_de_nacimiento} />
                    {formik.touched.fecha_de_nacimiento && formik.errors.fecha_de_nacimiento ? (
                        <div className="text-primary">{formik.errors.fecha_de_nacimiento}</div>
                    ) : null}
                </div>
                <div className="mb-3">
                    <label htmlFor="genero" className="text-label">Género</label>
                    <select className="form-select" id="genero" name="genero" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.genero}>
                        <option value="" label="Seleccione un genero" />
                        <option value="artigas" label="Masculino" />
                        <option value="canelones" label="Femenino" />
                        <option value="colonia" label="Otro" />
                    </select>
                    {formik.touched.genero && formik.errors.genero ? (
                        <div className="text-primary">{formik.errors.genero}</div>
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
                    <label htmlFor="telefono" className="text-label">Teléfono de contacto</label>
                    <input type="text" name="telefono" className="form-control" id="telefono" aria-describedby="telefono" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.telefono} />
                    {formik.touched.telefono && formik.errors.telefono ? (
                        <div className="text-primary">{formik.errors.telefono}</div>
                    ) : null}
                </div>
                <div className="mb-3">
                    <label htmlFor="foto" className="text-label">Foto de perfil</label>
                    <input type="file" name="foto" className="form-control" id="foto" aria-describedby="foto" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.foto} />
                    {formik.touched.foto && formik.errors.foto ? (
                        <div className="text-primary">{formik.errors.foto}</div>
                    ) : null}
                </div>
                <hr />
                <div className="mb-3">
                    <label htmlFor="pais_nacimiento" className="text-label">País de nacimiento</label>
                    <select className="form-select" id="pais_nacimiento" name="pais_nacimiento" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.pais_nacimiento}>
                        <option value="" label="Seleccione el país" />
                        <option value="uruguay" label="Uruguay" />
                        <option value="otro1" label="Otro" />
                        <option value="otro2" label="Otro" />
                    </select>
                    {formik.touched.pais_nacimiento && formik.errors.pais_nacimiento ? (
                        <div className="text-primary">{formik.errors.pais_nacimiento}</div>
                    ) : null}
                </div>
                <div className="mb-3">
                    <label htmlFor="departamento" className="text-label">Departamento de residencia</label>
                    <select className="form-select" id="departamento" name="departamento" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.departamento}>
                    <option value="" label="Seleccione un departamento"></option>
                        <option value="artigas" label="Artigas"></option>
                        <option value="canelones" label="Canelones"></option>
                        <option value="colonia" label="Colonia"></option>
                        <option value="durazno" label="Durazno"></option>
                        <option value="flores" label="Flores"></option>
                        <option value="florida" label="Florida"></option>
                        <option value="lavalleja" label="Lavalleja"></option>
                        <option value="maldonado" label="Maldonado"></option>
                        <option value="montevideo" label="Montevideo"></option>
                        <option value="paysandu" label="Paysandú"></option>
                        <option value="rio-negro" label="Río Negro"></option>
                        <option value="rivera" label="Rivera"></option>
                        <option value="rocha" label="Rocha"></option>
                        <option value="salto" label="Salto"></option>
                        <option value="san-jose" label="San José"></option>
                        <option value="soriano" label="Soriano"></option>
                        <option value="tacuarembo" label="Tacuarembó"></option>
                        <option value="treinta-y-tres" label="Treinta y Tres"></option>
                    </select>
                    {formik.touched.departamento && formik.errors.departamento ? (
                        <div className="text-primary">{formik.errors.departamento}</div>
                    ) : null}
                </div>
                <div className="mb-3">
                    <label htmlFor="ciudad" className="text-label">Ciudad</label>
                    <select className="form-select" id="ciudad" name="ciudad" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.ciudad}>
                        <option value="" label="Seleccione una ciudad" />
                        <option value="ciudad1" label="Una ciudad" />
                        <option value="ciudad2" label="Otra ciudad" />
                        <option value="ciudad3" label="Otra ciudad" />
                    </select>
                    {formik.touched.ciudad && formik.errors.ciudad ? (
                        <div className="text-primary">{formik.errors.ciudad}</div>
                    ) : null}
                </div>
                <hr />
                <div className="mb-3">
                    <label htmlFor="especialidad" className="text-label">Especialidad</label>
                    <select className="form-select" id="especialidad" name="especialidad" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.especialidad}>
                        <option value="" label="Seleccione una especialidad" />
                        <option value="psicologia" label="Psicología" />
                        <option value="odontologia" label="Odontología" />
                        <option value="nutricion" label="Nutrición" />
                    </select>
                    {formik.touched.especialidad && formik.errors.especialidad ? (
                        <div className="text-primary">{formik.errors.especialidad}</div>
                    ) : null}
                </div>
                <div className="mb-3">
                    <label htmlFor="antiguedad" className="text-label">Antigüedad</label>
                    <input type="number" name="antiguedad" className="form-control" id="antiguedad" aria-describedby="antiguedad" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.antiguedad} />
                    {formik.touched.antiguedad && formik.errors.antiguedad ? (
                        <div className="text-primary">{formik.errors.antiguedad}</div>
                    ) : null}
                </div>
                <label htmlFor="modalidad" className="text-label">Modalidad de consulta</label>
                <div className="mb-3" role="group">
                    <div className="form-check">
                        <input type="checkbox" name="modalidad" className="form-check-input" id="remoto"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value="Remoto"
                            checked={formik.values.modalidad.includes("Remoto")} />
                        <label className="form-check-label" htmlFor="remoto">Remoto</label>
                    </div>
                    <div className="form-check">
                        <input type="checkbox" name="modalidad" className="form-check-input" id="presencial"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value="Presencial"
                            checked={formik.values.modalidad.includes("Presencial")} />
                        <label className="form-check-label" htmlFor="presencial">Presencial</label>
                    </div>
                    {formik.touched.modalidad && formik.errors.modalidad ? (
                        <div className="text-primary">{formik.errors.modalidad}</div>
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
