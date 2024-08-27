import React from 'react';

export const VistaRestablecerClave = () => {
    return (
        <div className='contenido '>
            {/* <div className=''> */}
            <img
                className="w-25 h-25 mx-auto d-block"
                src="https://i.pinimg.com/736x/76/38/69/763869a33c8ac9e99a59500992c11127.jpg"
                alt="Illustration"
            />
            <h1 className='text-center text-title text-primary'>Restablecer contraseña</h1>
            <h6 className="text-center">Crea una nueva contraseña para acceder a tu cuenta:</h6>
            <form>
                <div className="mb-3 w-25 d-flex justify-content-center">
                    <input
                        type="password"
                        className="form-control"
                        id="email"
                        // value={email}
                        // onChange={handleEmailChange}
                        required
                    />
                </div>
                <div className='text-center'>
                    <button type="submit" className="btn bg-primary text-white">
                        Guardar nueva contraseña
                    </button>
                </div>
            </form>
        </div>

    )
}