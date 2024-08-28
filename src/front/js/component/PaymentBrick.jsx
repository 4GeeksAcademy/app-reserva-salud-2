import React, { useEffect, useState } from 'react';
import { Payment} from '@mercadopago/sdk-react';
import { initMercadoPago } from '@mercadopago/sdk-react'

const PaymentBrick = ({amount,id_profesional}) => {
    const [preferenceId, setPreferenceId] = useState('');

    useEffect(() => {
        if (window.paymentBrickController) {
            window.paymentBrickController.unmount();
        }
        // Inicializar MercadoPago SDK
        initMercadoPago('TEST-aa5a7225-3468-4679-81f2-4d313d397c8c',{locale:"es-UY"});
        // Obtener el preferenceId desde tu backend
        fetch('https://verbose-space-orbit-q5wjv57g6gvh965-3001.app.github.dev/api/create_preference', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title: 'Producto de prueba',
                quantity: 1,
                unit_price: 100.0,
            }),
        })
        .then(response => response.json())
        .then(data => {
            setPreferenceId(data.id);
        })
        .catch(error => console.error('Error al obtener el preferenceId:', error));
        return () => {
            if (window.paymentBrickController) {
                window.paymentBrickController.unmount();
            }
        };
    }, []);

    const initialization = {
        amount: amount,
        preferenceId: preferenceId,
    };

    const customization = {
        paymentMethods: {
            ticket: "all",
            creditCard: "all",
            debitCard: "all",
            mercadoPago: "all",
        },
    };

    const onSubmit = async ({ selectedPaymentMethod, formData }) => {
        console.log('Form Data:', formData);
        
    const paymentToken = formData.token;
    // Aquí capturamos específicamente el token
    console.log('Token Capturado:', paymentToken); 
        
        return new Promise((resolve, reject) => {
            fetch('https://verbose-space-orbit-q5wjv57g6gvh965-3001.app.github.dev/api/process_payment', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
               
            })
            .then((response) => {
                if(response.ok){
                    
                    return response.json()
                }
            })
            .then((data) => {
                
                if(data){
                    console.log('pago procesado correctamente:',data)
                    const bodyWithProfessionalId = {
                        data: data, 
                        professional_id: id_profesional    
                    };    
                    fetch('https://verbose-space-orbit-q5wjv57g6gvh965-3001.app.github.dev/api/data_pay_mp', {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                        },
                        body: JSON.stringify(bodyWithProfessionalId),  
                    })
                    .then((response) => {
                        if(response.ok){
                            console.log('Datos almacenados correctamente en la base de datos');
                            resolve();
                        } 
                    })
                    .catch((error) => reject('Error al intentar conectar con el servidor: ' + error));               
               } 
            })
            .catch((error) => {
                reject();
            });
        });
    };

    const onError = async (error) => {
        console.error('Error en el Brick:', error);
    };

    const onReady = async () => {
        console.log('Brick está listo');
    };

    return (
        preferenceId &&
        <Payment 
            initialization={initialization} 
            customization={customization} 
            onSubmit={onSubmit} 
            onReady={onReady} 
            onError={onError} 
        />
    );
};

export default PaymentBrick;