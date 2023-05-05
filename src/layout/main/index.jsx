import React from 'react'
import { Outlet } from 'react-router-dom'
import { BottomNavigation } from '../../components/bottom-navigation'

function MainLayout() {
  return (
    <div>
      <Outlet />
      <BottomNavigation />
    </div>
  )
}

export default MainLayout
