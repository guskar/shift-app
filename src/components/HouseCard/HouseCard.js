
import { useState } from "react"
import styles from './style.module.css'
import { MdPool } from 'react-icons/md';
import { MdWifi } from 'react-icons/md';

const HouseCard = ({ house }) => {

  return (

    <div className={styles.houseCard}>
      <img src='https://lnu.se/api/media/27026-fw448fh448' alt='' />
      <h3>{house.location}</h3>
      <h5>{house.description}</h5>
      <div className={styles.iconsDiv}>
        <h5>{house.pool ? <MdPool className={styles.icons}></MdPool> : ''}</h5>
        <h5>{house.wifi ? <MdWifi className={styles.icons}></MdWifi> : ''}</h5>
        <h5>{house.tv ? 'tv' : ''}</h5>
      </div>


    </div>

  )
}

export default HouseCard