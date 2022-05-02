import PrintHouses from "../../components/PrintHouses/PrintHouses"
import PrintUserHouses from "../../components/PrintUserHouses/PrintUserHouses"
import { useIsLoggedIn } from "../../utils/utilhooks"
import styles from './style.module.css'


const Profile = () => {
  const isLoggedIn = useIsLoggedIn()
  return (
    <div className= {styles.profileDiv}>
      <div className={styles.allHousesDiv}>
        {isLoggedIn && <PrintHouses></PrintHouses>}
      </div>

      <div>
      {isLoggedIn && <h2>Your houses</h2>}
        {isLoggedIn && <PrintUserHouses></PrintUserHouses>}
      </div>

    </div>
  )
}

export default Profile