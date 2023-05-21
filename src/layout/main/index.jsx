import React from 'react'
import { Outlet } from 'react-router-dom'
import { BottomNavigation } from '../../components/bottom-navigation'

const PassedDataContext = React.createContext(null)

function MainLayout() {
  const [passedData, setPassedData] = React.useState(null)
  const changePassedData = (data) => {
    setPassedData(data)
  }
  return (
    <div>
      <PassedDataContext.Provider value={{ passedData, changePassedData }} >
        <Outlet />
      </PassedDataContext.Provider>
      <BottomNavigation />
    </div>
  )
}

export { MainLayout, PassedDataContext }
