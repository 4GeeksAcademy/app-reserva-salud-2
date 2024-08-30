import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { backendApi } from '../store/flux';
import { set } from 'date-fns';

export const PaymentState = () => {
  const [paymentData, setPaymentData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const queryData = {
      payment_id: queryParams.get('payment_id'),
      status: queryParams.get('status'),
    };

    // Se obtiene la información del pago
    backendApi.get(`/get_payment/${queryData.payment_id}`)
      .then(({ data: dataPayment }) => {
        setPaymentData(dataPayment);
        console.log(dataPayment);

        // Se guarda el pago en la base de datos
        backendApi.post('/data_pay_mp', dataPayment)
          .then(({ data: dataInDatabase }) => {
            console.log(dataInDatabase);
          })
          .catch((error) => {
            console.log(error);
          });

      })
      .catch((error) => {
        console.log(error)
      })

  }, []);
  return paymentData &&
    paymentData.status === 'approved' ? (
    <div className='contenido container text-center'>
      <h1>Gracias por tu reserva</h1>
      <p>El pago se realizó con éxito</p>
      <button className='btn btn-primary' onClick={() => navigate('/')}>Volver al inicio</button>
    </div>
  ) : (
    <div>
      <h1>Hubo un problema con tu pago</h1>
      <p>Por favor, intenta nuevamente</p>
    </div>
  )
}
