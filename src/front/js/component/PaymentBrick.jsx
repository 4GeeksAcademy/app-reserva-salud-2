import React, { useContext, useEffect, useState } from 'react';
import { Payment, StatusScreen, Wallet } from '@mercadopago/sdk-react';
import { initMercadoPago } from '@mercadopago/sdk-react'
import { Context } from '../store/appContext';
import { backendApi } from '../store/flux';

const PaymentBrick = ({ amount, id_profesional, appointment }) => {
    const [preferenceId, setPreferenceId] = useState('');
    const [paymentId, setPaymentId] = useState(null);
    const { store } = useContext(Context);

    const initialization = {
        redirectMode: 'self'
    };

    const customization = {

    };

    console.log(appointment)

    useEffect(() => {
        initMercadoPago('TEST-aa5a7225-3468-4679-81f2-4d313d397c8c', { locale: "es-UY" });

        let preferenceData = {};

        if (appointment) {
            if (appointment.reservationType === "remote") {
                preferenceData = {
                    items: [
                        {
                            title: 'Consulta Remota',
                            quantity: 1,
                            unit_price: 800.0,
                        }
                    ]
                };
            } else if (appointment.reservationType === "presential") {
                preferenceData = {
                    items: [
                        {
                            title: 'Consulta Presencial',
                            quantity: 1,
                            unit_price: 1100.0,
                        }
                    ]
                };
            }
            backendApi.post('/create_preference', preferenceData)
                .then(({ data }) => {
                    const { id } = data;
                    console.log('Preferencia creada:', data);
                    setPreferenceId(data.preference_id);
                })
                .catch((error) => {
                    console.log(error)
                });
        }


    }, [id_profesional]);

    // const onSubmit = async () => {


    //     return new Promise((resolve, reject) => {
    //         backendApi.post('/create_preference', preferenceData)
    //             .then((response) => {
    //                 const { id } = response.data;
    //                 console.log('Preferencia creada:', response.data);
    //                 resolve(response.date.preference_id);
    //             })
    //             .catch((error) => {
    //                 console.log(error)
    //                 reject();
    //             });

    // .then((response) => {
    //     if (response.ok) {

    //         return response.json()
    //     }
    // })
    // .then((data) => {

    //     if (data) {
    //         console.log('pago procesado correctamente:', data)
    //         const bodyWithProfessionalId = {
    //             data: data,
    //             professional_id: id_profesional
    //         };
    //         fetch(`${process.env.BACKEND_URL}/api/data_pay_mp`, {
    //             method: "POST",
    //             headers: {
    //                 "Content-Type": "application/json",
    //             },
    //             body: JSON.stringify(bodyWithProfessionalId),
    //         })
    //             .then((response) => {
    //                 if (response.ok) {
    //                     console.log('Datos almacenados correctamente en la base de datos');
    //                     resolve();
    //                 }
    //             })
    //             .catch((error) => reject('Error al intentar conectar con el servidor: ' + error));
    //     }
    // })
    // .catch((error) => {
    //     reject();
    // });
    // });
    //     };

    const onError = async (error) => {
        console.error('Error en el Brick:', error);
    };

    const onReady = async () => {
        console.log('Brick está listo');
    };

    return (
        preferenceId && (
            <>
                <Wallet
                    initialization={{ preferenceId }}
                    // onSubmit={() => {
                    //     // Callback called when clicking Wallet Brick.
                    //     // This is possible because the brick is a button.
                    //     // At this time of submit, you must create the preference.
                    //     const yourRequestBodyHere = {
                    //         items: [
                    //             {
                    //                 id: "202809963",
                    //                 title: "Dummy title",
                    //                 description: "Dummy description",
                    //                 quantity: 1,
                    //                 unit_price: 10,
                    //             },
                    //         ],
                    //         purpose: "wallet_purchase",
                    //     };

                    //     return new Promise((resolve, reject) => {
                    //         backendApi.post("/create_preference", yourRequestBodyHere)
                    //             .then(({ data }) => {
                    //                 // Resolve the promise with the Preference ID
                    //                 resolve(data.preference_id);
                    //             })
                    //             .catch((error) => {
                    //                 // Handle error response when trying to create the preference
                    //                 reject();
                    //             });
                    //     });
                    // }}
                    onError={onError}
                    onReady={onReady}
                />
            </>
        )
    );
};

export default PaymentBrick;