import React, { useContext } from "react";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import "../../styles/index.css";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const RegistroProfesional = () => {
  const handleCalendlyAuth = () => {
    window.location.href = `https://auth.calendly.com/oauth/authorize?response_type=code&client_id=${process.env.CALENDLY_CLIENT_ID}&redirect_uri=${process.env.CALENDLY_REDIRECT_URI}`;
  };

  const { actions } = useContext(Context);

  return (
    <Formik
      initialValues={{
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        state: "",
        profile_picture: "",
        birth_date: "",
        telephone: "",
        title: "",
        url_calendly: "",
        is_active: true,
        modalidad: [],
      }}
      validationSchema={Yup.object({
        first_name: Yup.string().required("El nombre es obligatorio"),
        last_name: Yup.string().required("El apellido es obligatorio"),
        email: Yup.string()
          .email("El email no es válido")
          .required("El email es obligatorio"),
        password: Yup.string()
          .required("La contraseña es obligatoria")
          .min(8, "La contraseña debe tener al menos 8 caracteres"),
        state: Yup.string().required("El estado es obligatorio"),
        profile_picture: Yup.string()
          .url("Debe ser una URL válida")
          .required("La foto de perfil es obligatoria"),
        birth_date: Yup.date().required(
          "La fecha de nacimiento es obligatoria"
        ),
        telephone: Yup.string().required("El teléfono es obligatorio"),
        title: Yup.string().required("El título es obligatorio"),
        url_calendly: Yup.string()
          .url("Debe ser una URL válida")
          .required("La URL de Calendly es obligatoria"),
        is_active: Yup.boolean(),
        modalidad: Yup.array().min(
          1,
          "Debe seleccionar al menos una modalidad"
        ),
      })}
      onSubmit={async (values) => {
        await actions.createProfessional(values);
      }}
    >
      {({ errors, touched, values }) => (
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
          <Form className="bg-tertiary p-2 rounded-bottom">
            <div className="mb-3">
              <label htmlFor="first_name" className="text-label">
                Nombre
              </label>
              <Field
                type="text"
                name="first_name"
                className="form-control"
                id="first_name"
                aria-describedby="first_name"
              />
              {touched.first_name && errors.first_name ? (
                <div className="text-primary">{errors.first_name}</div>
              ) : null}
            </div>

            <div className="mb-3">
              <label htmlFor="last_name" className="text-label">
                Apellido
              </label>
              <Field
                type="text"
                name="last_name"
                className="form-control"
                id="last_name"
                aria-describedby="last_name"
              />
              {touched.last_name && errors.last_name ? (
                <div className="text-primary">{errors.last_name}</div>
              ) : null}
            </div>

            <div className="mb-3">
              <label htmlFor="email" className="text-label">
                Email
              </label>
              <Field
                type="email"
                name="email"
                className="form-control"
                id="email"
                aria-describedby="email"
              />
              {touched.email && errors.email ? (
                <div className="text-primary">{errors.email}</div>
              ) : null}
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="text-label">
                Contraseña
              </label>
              <Field
                type="password"
                name="password"
                className="form-control"
                id="password"
                aria-describedby="password"
              />
              {touched.password && errors.password ? (
                <div className="text-primary">{errors.password}</div>
              ) : null}
            </div>

            <div className="mb-3">
              <label htmlFor="state" className="text-label">
                Departamento de residencia
              </label>
              <Field
                as="select"
                className="form-select"
                id="state"
                name="state"
              >
                <option value="">Seleccione un departamento</option>
                <option value="ARTIGAS">Artigas</option>
                <option value="CANELONES">Canelones</option>
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
              </Field>
              {touched.state && errors.state ? (
                <div className="text-primary">{errors.state}</div>
              ) : null}
            </div>

            <div className="mb-3">
              <label htmlFor="profile_picture" className="text-label">
                Foto de perfil
              </label>
              <Field
                type="url"
                name="profile_picture"
                className="form-control"
                id="profile_picture"
                aria-describedby="profile_picture"
              />
              {touched.profile_picture && errors.profile_picture ? (
                <div className="text-primary">{errors.profile_picture}</div>
              ) : null}
            </div>

            <div className="mb-3">
              <label htmlFor="birth_date" className="text-label">
                Fecha de nacimiento
              </label>
              <Field
                type="date"
                name="birth_date"
                className="form-control"
                id="birth_date"
                aria-describedby="birth_date"
              />
              {touched.birth_date && errors.birth_date ? (
                <div className="text-primary">{errors.birth_date}</div>
              ) : null}
            </div>

            <div className="mb-3">
              <label htmlFor="telephone" className="text-label">
                Teléfono de contacto
              </label>
              <Field
                type="text"
                name="telephone"
                className="form-control"
                id="telephone"
                aria-describedby="telephone"
              />
              {touched.telephone && errors.telephone ? (
                <div className="text-primary">{errors.telephone}</div>
              ) : null}
            </div>

            <div className="mb-3">
              <label htmlFor="title" className="text-label">
                Especialidad
              </label>
              <Field
                as="select"
                className="form-select"
                id="title"
                name="title"
              >
                <option value="">Seleccione una especialidad</option>
                <option value="psicologia">Psicología</option>
                <option value="odontologia">Odontología</option>
                <option value="nutricion">Nutrición</option>
              </Field>
              {touched.title && errors.title ? (
                <div className="text-primary">{errors.title}</div>
              ) : null}
            </div>

            <div className="mb-3">
              <label htmlFor="url_calendly" className="text-label">
                URL de Calendly
              </label>
              <Field
                type="url"
                name="url_calendly"
                className="form-control"
                id="url_calendly"
                aria-describedby="url_calendly"
              />
              {touched.url_calendly && errors.url_calendly ? (
                <div className="text-primary">{errors.url_calendly}</div>
              ) : null}
            </div>

            <div className="mb-3">
              <label htmlFor="modalidad" className="text-label">
                Modalidad de consulta
              </label>
              <div className="mb-3" role="group">
                <div className="form-check">
                  <Field
                    type="checkbox"
                    name="modalidad"
                    className="form-check-input"
                    id="remoto"
                    value="Remoto"
                    checked={values.modalidad.includes("Remoto")}
                  />
                  <label className="form-check-label" htmlFor="remoto">
                    Remoto
                  </label>
                </div>
                <div className="form-check">
                  <Field
                    type="checkbox"
                    name="modalidad"
                    className="form-check-input"
                    id="presencial"
                    value="Presencial"
                    checked={values.modalidad.includes("Presencial")}
                  />
                  <label className="form-check-label" htmlFor="presencial">
                    Presencial
                  </label>
                </div>
                {touched.modalidad && errors.modalidad ? (
                  <div className="text-primary">{errors.modalidad}</div>
                ) : null}
              </div>
            </div>

            <label>
              <Field type="checkbox" name="is_active" />
              Activo
            </label>
            {touched.is_active && errors.is_active ? (
              <div className="text-primary">{errors.is_active}</div>
            ) : null}

            <div className="d-flex justify-content-center">
              <button type="submit" className="btn bg-primary text-white">
                <i className="fa-solid fa-user-plus"></i> Registrarse como paciente
              </button>
            </div>

            <div className="mt-3 d-flex justify-content-center">
              <p>
                ¿Ya tienes una cuenta?{" "}
                <Link className="link-underline-primary" to="/">
                  {" "}
                  Inicia sesión
                </Link>
              </p>
            </div>
          </Form>
          <div className="mb-3">
            <button
              type="button"
              className="btn bg-secondary text-white"
              onClick={handleCalendlyAuth}
            >
              Autorizar con Calendly
            </button>
          </div>
        </div>
      )}
    </Formik>
  );
};
