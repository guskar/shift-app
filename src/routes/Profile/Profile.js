
import PrintHouses from "../../components/PrintHouses/PrintHouses"
import { useIsLoggedIn } from "../../utils/utilhooks"
import styles from './style.module.css'


const Profile = () => {
  const isLoggedIn = useIsLoggedIn()
  return (
    <div className= {styles.profileDiv}>
      <div className={styles.allHousesDiv}>
        {isLoggedIn && <PrintHouses></PrintHouses>}
      </div>
    </div>
  )
}

export default Profile