import React from 'react'
import PrintHouses from '../../components/PrintHouses/PrintHouses'
import { useIsLoggedIn } from '../../utils/utilhooks'
import styles from './style.module.css'

/**
 * A route for the profilepage.
 *
 * @returns {React.ReactElement} The profilepage.
 */
const Profile = () => {
  const isLoggedIn = useIsLoggedIn()
  return (
    <div className={styles.allHousesDiv}>
      {isLoggedIn && <PrintHouses></PrintHouses>}
    </div>
  )
}

export default Profile
