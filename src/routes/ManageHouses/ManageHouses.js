
import PrintUserHouses from '../../components/PrintUserHouses/PrintUserHouses'
import { useIsLoggedIn } from '../../utils/utilhooks'
import styles from './style.module.css'
import { useNavigate} from 'react-router'


const ManageHouses = () => {
  const navigate = useNavigate()
  const isLoggedIn = useIsLoggedIn()
  

  return (
    <div>
      <button className={styles.button} onClick={() => navigate('add')}>Add house</button>
      <div className={styles.houseDiv}>
        {isLoggedIn && <PrintUserHouses></PrintUserHouses>}
      </div>
        
    </div>
  )
}

export default ManageHouses