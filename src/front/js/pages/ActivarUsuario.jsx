import React, { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { Context } from '../store/appContext';

export const VistaActivarUsuario = () => {
    const location = useLocation();
    const { actions } = useContext(Context);

    // Extraer correo de la URL
    const searchParams = new URLSearchParams(location.search);
    const email = searchParams.get('email');

    // Función para manejar la activación del usuario
    const handleActivateUser = async () => {
        if (email) {
            const result = await actions.activateUser(email);
            if (result) {
                console.log('Cuenta activada con éxito');
                // Aquí puedes agregar redireccionamiento o alguna lógica adicional después de activar la cuenta
            } else {
                console.error('Error al activar la cuenta');
            }
        } else {
            console.error('Email no encontrado en la URL');
        }
    };

    return (
        <div className="contenido">
            <img
                className="w-25 h-25 mx-auto d-block"
                src="https://i.pinimg.com/736x/76/38/69/763869a33c8ac9e99a59500992c11127.jpg"
                alt="Illustration"
            />
            <h1 className='text-center text-title text-primary'>Activa tu cuenta</h1>
            <h6 className="text-center">Presiona en el botón Confirmar para activar tu cuenta</h6>
            <div className="mb-3 w-100 d-flex justify-content-center">
                <div className='text-center'>
                    <button 
                        type="submit" 
                        className="btn bg-primary text-white mb-4" 
                        onClick={handleActivateUser}
                    >
                       Confirmar
                    </button>
                </div>
            </div>
        </div>
    );
};