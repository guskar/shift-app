
import styles from './style.module.css'
import {  MdPool } from 'react-icons/md'
import { MdWifi } from 'react-icons/md'
import { useNavigate } from 'react-router'

const HouseCard = ({ house }) => {
  
  const navigate = useNavigate()
  const handleOnClick = () => {
    navigate(`/houses/${house.id}`)
  }

  return (
    <button onClick={handleOnClick}>
      <div className={styles.houseCard}>
        <img src={house.imageUrl} alt='' />
        <h3>{house.location}</h3>
        <h5>{house.description}</h5>
        <div className={styles.iconsDiv}>
          <h5>{house.pool ? <MdPool className={styles.icons}></MdPool> : ''}</h5>
          <h5>{house.wifi ? <MdWifi className={styles.icons}></MdWifi> : ''}</h5>
          <h5>{house.tv ? 'tv' : ''}</h5>
        </div>
      </div>
    </button>
  )
}

export default HouseCard