
import styles from './style.module.css'
import {  MdPool } from 'react-icons/md'
import { MdWifi } from 'react-icons/md'
import { useNavigate } from 'react-router'
import { FiMonitor } from 'react-icons/fi'
import { MdBed } from 'react-icons/md'
import { FaWheelchair } from 'react-icons/fa'


const HouseCard = ({ house }) => {
  const navigate = useNavigate()

  const handleOnClick = () => {
    navigate(`/houses/${house.id}`)
  }

  return (
    <button onClick={handleOnClick} className={styles.button}>
      <div className={styles.houseCard}>
        <img src={house.imageUrl} alt='' className={styles.img}/>
        <h3>{house.location}</h3>
        <h5>{house.owner}</h5>
        <div className={styles.iconsDiv}>
          <h5>{house.pool ? <MdPool className={styles.icons}></MdPool> : ''}</h5>
          <h5>{house.wifi ? <MdWifi className={styles.icons}></MdWifi> : ''}</h5>
          <h5>{house.tv ? <FiMonitor className={styles.icons}></FiMonitor> : ''}</h5>
          <h5>{house.wheelchairAccessible ? <FaWheelchair className={styles.icons}></FaWheelchair> : ''}</h5>
          <h5>{ <MdBed className={styles.icons}></MdBed>} {house.beds}</h5>
          <h5>{`Rooms: ${house.rooms}`}</h5>
          <h5>{house.borrow ? 'Free to borrow': ''}</h5>
          
        </div>
      </div>
    </button>
  )
}

export default HouseCard