
import { useState } from "react"
import styles from './style.module.css'
const HouseCard = ({house}) => {
  
  return (
       
        <div className={styles.houseCard}>
          <img src='https://lnu.se/api/media/27026-fw448fh448' alt='' />
          <h3>{house.location}</h3>
          <h5>{house.description}</h5>
          <h5>{house.pool? 'pool' : ''}</h5>
          <h5>{house.wifi? 'wifi': ''}</h5>
          <h5>{house.tv? 'tv': ''}</h5>

        </div>    
   
  )
}

export default HouseCard