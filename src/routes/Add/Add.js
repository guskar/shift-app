import React from 'react'
import { Navigate } from 'react-router-dom'
import CreateHouseForm from '../../components/CreateHouseForm/CreateHouseForm'
import { useIsLoggedIn } from '../../utils/utilhooks'

const Add = () => {
  const isLoggedIn = useIsLoggedIn()

  if (!isLoggedIn) {
    return <Navigate to="/" />
  }

  return (
    <CreateHouseForm></CreateHouseForm>
  )
}

export default Add