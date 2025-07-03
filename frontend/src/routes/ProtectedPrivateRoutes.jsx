import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

export const ProtectedPrivateRoutes = () => {
    const { isAuthenticated } = useSelector(state => state.auth)
    return isAuthenticated  ?<Outlet /> : <Navigate to="/auth/login" />
}
