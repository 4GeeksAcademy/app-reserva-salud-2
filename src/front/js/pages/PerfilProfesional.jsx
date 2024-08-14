import axios from 'axios'
import React, { useEffect, useState } from 'react'
import moment from 'moment'

export const PerfilProfesional = () => {
  const { access_token, owner } = JSON.parse(localStorage.getItem('calendlyResponse'))
  const [eventos, setEventos] = useState({})

  useEffect(() => {
    const getEvents = async () => {
      try {
        const response = await axios.get(`https://api.calendly.com/event_types?user=${owner}`, {
          headers: {
            Authorization: `Bearer ${access_token}`
          }
        })
        setEventos(response.data)
      } catch (error) {
        console.log(error)
      }
    }
    getEvents()
  }, [])

  console.log(eventos)

  return (
    <div className='container contenido py-4'>
      <div className="row row-cols-1 row-cols-md-2 g-4">
        {
          eventos.collection && eventos.collection.map((evento, index) => {
            return (
              <div key={index} className="col">
                <div className="card">
                  <div className="card-header">
                    <h5 className="card-title">Cita {evento.name}</h5>
                  </div>
                  <div className="card-body">
                    <p className="card-text">Duración: {evento.duration} minutos</p>
                    <p className='card-text'>Ubicación: {evento.locations?.map(location => location.kind === 'physical' ? location.location : "")}</p>
                  </div>
                </div>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}
