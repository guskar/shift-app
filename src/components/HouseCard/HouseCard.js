
import styles from './style.module.css'
import { MdPool, MdWifi, MdBed } from 'react-icons/md'
import { useNavigate } from 'react-router'
import { FiMonitor } from 'react-icons/fi'
import { FaWheelchair } from 'react-icons/fa'
import React from 'react'
/**
 * A housacard component.
 *
 * @type {object} Props.
 * @returns {React.ReactElement} The housecard component.
 */
const HouseCard = ({ house }) => {
  const navigate = useNavigate()

  /**
   * Navigates user to /houses/${house.id}.
   */
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
          {house.pool ? <MdPool className={styles.icons}></MdPool> : null}
          {house.wifi ? <MdWifi className={styles.icons}></MdWifi> : null}
          {house.tv ? <FiMonitor className={styles.icons}></FiMonitor> : null}
          {house.wheelchairAccessible ? <FaWheelchair className={styles.icons}></FaWheelchair> : null}
          { <h5><MdBed className={styles.icons}></MdBed>{house.beds}</h5>}
          <h5>{`Rooms: ${house.rooms}`}</h5>
          {house.borrow ? <h5>Free to borrow</h5> : null}
        </div>
      </div>
    </button>
  )
}

export default HouseCard
