import React, { useContext, useState } from 'react';
import { Context } from '../store/appContext';

export const ModalRestablecerClave = ({ cerrarModal }) => {
  const { store, actions } = useContext(Context);
  const [email, setEmail] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  
  const resetPass = async (e) => {
    e.preventDefault(); 
    await actions.resetPassword(email);
    cerrarModal();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md">
        <div className="flex justify-between items-center p-4 border-b">
          <h5 className="text-lg font-semibold text-primary">Recuperar Contraseña</h5>
          <button
            type="button"
            className="text-gray-500 hover:text-gray-700"
            onClick={cerrarModal}
            aria-label="Close"
          >
            &times;
          </button>
        </div>
        <div className="p-4">
          <p className="text-sm mb-4">
            Si olvidaste tu contraseña, ingresa aquí tu correo electrónico para restablecerla:
          </p>
          <form onSubmit={resetPass}>
            <div className="mb-4">
              <input
                type="email"
                className="w-full p-2 border rounded"
                placeholder="Correo electrónico"
                value={email}
                onChange={handleEmailChange}
                required
              />
            </div>
            <div className="text-center">
              <button
                type="submit"
                className="px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark"
              >
                Enviar mensaje de recuperación
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};