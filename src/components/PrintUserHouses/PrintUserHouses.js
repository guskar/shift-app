import React from 'react'
import HouseCard from '../HouseCard/HouseCard'
import styles from './style.module.css'
import useUserHouses from './UseUserHousesHook'
import FlashMessage from '../FlashMessage/FlashMessage'
/**
 * A component that prints all Userhouses.
 *
 * @returns {React.ReactElement} The PrintUserHouses component.
 */
const PrintUserHouses = () => {
  const { filteredHouses } = useUserHouses([])
  const noHousesToDisplay = filteredHouses.length === 0

  return (
    <div className={styles.houseDiv}>
       {filteredHouses.map((house) => (
        <div key={house.id}>
          <HouseCard house={house}></HouseCard>
        </div>
       ))}
        {noHousesToDisplay && <FlashMessage message={'You have no houses to display, Press Add house to create a house'} show={true}></FlashMessage>}
    </div>
  )
}

export default PrintUserHouses
