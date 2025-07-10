import React from 'react'
import { useSelector } from 'react-redux'
import { DashboardAdmin } from './DashboardAdmin'
import { DashboardSeller } from './DashboardSeller'

export const DashboardHome = () => {
  const {user} = useSelector(state=>state.auth)
  if (!user) return
  return user.role === "admin" ? <DashboardAdmin/> : <DashboardSeller/>
}
