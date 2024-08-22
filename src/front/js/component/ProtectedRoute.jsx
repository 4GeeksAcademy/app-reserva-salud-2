import React, { useContext } from 'react'
import { Context } from '../store/appContext';
import { Navigate } from 'react-router-dom';

export const ProtectedRoute = ({ element, ...rest }) => {
  const { store } = useContext(Context);

  if (!store.currentUser) {
    return <Navigate to='/login' replace />
  }

  return element
}

