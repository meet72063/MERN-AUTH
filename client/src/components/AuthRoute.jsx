import React from 'react'
import { getUser } from '../features/auth/authSlice'
import { Navigate } from 'react-router-dom'

const AuthRoute = ({ children }) => {
    const { user } = getUser()
    return !user ? children : <Navigate to="/" replace />
}

export default AuthRoute
