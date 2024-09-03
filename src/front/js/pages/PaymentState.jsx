import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { backendApi } from '../store/flux';

export const PaymentState = () => {
  const [paymentData, setPaymentData] = useState(null);
  const [loading, setLoading] = useState(true);
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
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className='container mx-auto min-h-screen px-8 pt-20 text-center'>
        <h1 className='text-4xl font-bold'><span className="loading loading-spinner loading-lg"></span> Procesando pago...</h1>
      </div>
    )
  }

  return paymentData && paymentData.status === 'approved' ? (
    <div className='container mx-auto min-h-screen px-8 pt-20 text-center'>
      <h1 className='text-4xl font-bold'>Gracias por tu reserva</h1>
      <p className='text-lg font-semibold'>El pago se realizó con éxito</p>
      <button className='btn btn-primary' onClick={() => navigate('/')}>Volver al inicio</button>
    </div>
  ) : (
    <div className='container mx-auto min-h-screen px-8 pt-20 text-center'>
      <h1 className='text-error text-4xl font-bold'>Hubo un problema con tu pago</h1>
      <p className='text-lg font-semibold'>Por favor, intenta nuevamente</p>
    </div>
  )
}
