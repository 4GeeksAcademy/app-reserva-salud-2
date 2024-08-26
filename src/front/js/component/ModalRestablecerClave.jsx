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
  <div className="modal fade show d-block" tabIndex="-1" role="dialog">
    <div className="modal-dialog modal-dialog-centered" role="document">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title text-primary">Recuperar Contraseña</h5>
          <button type="button" className="btn-close" data-bs-dismiss="modal" 
          onClick={cerrarModal} aria-label="Close"></button>
        </div>
        <div className="modal-body">
          <p className='text-label'>Si olvidaste tu contraseña, ingresa aquí tu correo
          electrónico para restablecerla:</p>
          <form onSubmit={resetPass}>
            <div className="mb-3">
              <input
                type="email"
                className="form-control"
                id="email"
                value={email}
                onChange={handleEmailChange}
                required
              />
            </div>
            <div className='text-center'>
              <button type="submit" className="btn bg-primary text-white">
                Enviar mensaje de recuperación
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
);
};