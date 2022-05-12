import React, { useState } from 'react'
import CreateHouseForm from '../../components/CreateHouseForm/CreateHouseForm'
import PrintUserHouses from '../../components/PrintUserHouses/PrintUserHouses'
import { useIsLoggedIn } from '../../utils/utilhooks'
import styles from './style.module.css'


const ManageHouses = () => {
  const isLoggedIn = useIsLoggedIn()
  const [showHouseForm, setShowHouseForm] = useState(false)

  return (
    <div>
      <button className={styles.button} onClick={() => setShowHouseForm(!showHouseForm)}>Add house</button>
      <div className={styles.houseDiv}>
        {isLoggedIn && <PrintUserHouses></PrintUserHouses>}
        {showHouseForm ? <CreateHouseForm></CreateHouseForm> : ''}
      </div>
    </div>
  )
}

export default ManageHouses