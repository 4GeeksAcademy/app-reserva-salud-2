import React, { useContext } from 'react'
import { Wallet as WalletMP, initMercadoPago } from '@mercadopago/sdk-react'
import { backendApi } from '../store/flux';
import { Context } from '../store/appContext';

export const Wallet = ({ appointment }) => {
  const { store } = useContext(Context);

  console.log(appointment)

  initMercadoPago('TEST-aa5a7225-3468-4679-81f2-4d313d397c8c', { locale: "es-UY" });

  let items = []

  if (appointment.reservationType === 'remote') {
    items = [
      {
        title: "Cita remota",
        description: "Reserva de cita remota",
        quantity: 1,
        unit_price: 800,
      },
    ]
  } else if (appointment.reservationType === 'presential') {
    items = [
      {
        title: "Cita presencial",
        description: "Reserva de cita presencial",
        quantity: 1,
        unit_price: 1100,
      },
    ]
  }

  return (
    <WalletMP
      initialization={{ redirectMode: 'self' }}
      onSubmit={() => {
        const yourRequestBodyHere = {
          items,
          back_urls: {
            success: `${process.env.FRONTEND_URL}/payment-state`,
            failure: `${process.env.FRONTEND_URL}/payment-state`,
            pending: `${process.env.FRONTEND_URL}/payment-state`
          },
          auto_return: "approved",
          metadata: {
            appointment: appointment,
            user: store?.currentUser
          },
          payer: {
            name: store?.currentUser?.first_name,
            surname: store?.currentUser?.last_name,
            email: store?.currentUser?.email,
            id: store?.currentUser?.id,
          }
        };

        return new Promise((resolve, reject) => {
          backendApi.post("/create_preference", yourRequestBodyHere)
            .then(({ data }) => {
              // Resolve the promise with the Preference ID
              resolve(data.id);
            })
            .catch((error) => {
              // Handle error response when trying to create the preference
              reject();
            });
        });
      }}
    />
  )
}
