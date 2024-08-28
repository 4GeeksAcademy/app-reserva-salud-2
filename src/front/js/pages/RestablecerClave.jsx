import React, { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { Context } from '../store/appContext';
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";

export const VistaRestablecerClave = () => {
    const location = useLocation();
    const { actions } = useContext(Context);

    // Extraer correo de la URL
    const searchParams = new URLSearchParams(location.search);
    const email = searchParams.get('email');

    return (
        <>
            <Formik
                initialValues={{
                    password: "", // Formik manejará este valor
                }}
                validationSchema={Yup.object({
                    password: Yup.string()
                        .required("Este campo es obligatorio")
                        .min(6, "Debe tener como mínimo 6 caracteres")
                })}
                onSubmit={async (values) => {
                    console.log(values);
                    await actions.updatePassword(email, values.password); 
                }}
            >
                {({ handleSubmit }) => (
                    <Form onSubmit={handleSubmit} className='contenido'>
                        <img
                            className="w-25 h-25 mx-auto d-block"
                            src="https://i.pinimg.com/736x/76/38/69/763869a33c8ac9e99a59500992c11127.jpg"
                            alt="Illustration"
                        />
                        <h1 className='text-center text-title text-primary'>Restablecer contraseña</h1>
                        <h6 className="text-center">Crea una nueva contraseña para acceder a tu cuenta:</h6>
                        <div className="mb-3 w-100 d-flex justify-content-center">
                            <Field
                                type="password"
                                className="form-control w-25 m-3 border-secondary"
                                id="new_password"
                                name="password"
                            />
                            <ErrorMessage className="text-normal text-primary" component="div" name="password" />
                        </div>
                        <div className='text-center'>
                            <button type="submit" className="btn bg-primary text-white mb-4">
                                Guardar nueva contraseña
                            </button>
                        </div>
                    </Form>
                )}
            </Formik>
        </>
    );
};

// ANTES DE IMPLEMENTAR FORMIK
// import React, { useState, useContext } from 'react';
// import { useLocation } from 'react-router-dom';
// import { Context } from '../store/appContext';


// export const VistaRestablecerClave = () => {
//     const [new_password, setNewPassword] = useState('');
//     const location = useLocation();
//     const { store, actions } = useContext(Context);

//     // Obtén el correo de la URL
//     const searchParams = new URLSearchParams(location.search);
//     const email = searchParams.get('email');

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         await actions.updatePassword(email, new_password);
//     };

//     return (
//         <div className='contenido'>
//             <img
//                 className="w-25 h-25 mx-auto d-block"
//                 src="https://i.pinimg.com/736x/76/38/69/763869a33c8ac9e99a59500992c11127.jpg"
//                 alt="Illustration"
//             />
//             <h1 className='text-center text-title text-primary'>Restablecer contraseña</h1>
//             <h6 className="text-center">Crea una nueva contraseña para acceder a tu cuenta:</h6>
//             <form onSubmit={handleSubmit}>
//                 <div className="mb-3 w-100 d-flex justify-content-center">
//                     <input
//                         type="password"
//                         className="form-control w-25 m-3 border-secondary"
//                         id="new_password"
//                         value={new_password}
//                         onChange={(e) => setNewPassword(e.target.value)}
//                         required
//                     />
//                 </div>
//                 <div className='text-center'>
//                     <button type="submit" className="btn bg-primary text-white mb-4">
//                         Guardar nueva contraseña
//                     </button>
//                 </div>
//             </form>
//         </div> 
//     );
// };
