import React from 'react'
import { getUser } from '../features/auth/authSlice'
import { Navigate } from 'react-router-dom'

const ProtectedRoute = ({ children }) => {
    const { user } = getUser()
    return user ? children : <Navigate to='/login' replace />
}

export default ProtectedRoute
