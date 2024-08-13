import React, { useContext, useEffect } from 'react'
import { Context } from '../store/appContext'

export const AccessCode = () => {
  const { actions } = useContext(Context)

  useEffect(() => {
    const url = new URL(window.location.href)
    const code = url.searchParams.get('code')
    actions.getCalendlyAccessToken(code)
  }, [])

  return (
    <div className='container contenido'>
      <h2 className='text-primary text-center'>Calendly conectado correctamente</h2>
    </div>
  )
}
