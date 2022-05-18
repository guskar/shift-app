// import { React, useEffect, useState } from 'react'
// import { getAccessToken, getLoggedInUserName } from '../../utils/auth'
import HouseCard from '../HouseCard/HouseCard'
import styles from './style.module.css'
import useUserHouses from './UseUserHousesHook'
import React from 'react'
/**
 * A component that prints all Userhouses.
 *
 * @returns {React.ReactElement} The PrintUserHouses component.
 */
const PrintUserHouses = () => {
  const { filteredHouses } = useUserHouses()
  // const [allHouses, setAllHouses] = useState([])
  // const [filteredHouses, setFilteredHouses] = useState([])
  // const [userName, setUsername] = useState('')

  // useEffect(() => {
  //   const accessToken = getAccessToken()

  //   setUsername(getLoggedInUserName())

  //   // 'https://cscloud8-44.lnu.se/shift/api/v1/houses'
  //   // 'http://localhost:8081/api/v1/houses'

  //   /**
  //    * Fetches all userhouses from api.
  //    */
  //   const fetcher = async () => {
  //     const response = await fetch('https://cscloud8-44.lnu.se/shift/api/v1/houses', {
  //       method: 'GET',
  //       headers: {
  //         Authorization: `Bearer ${accessToken}`
  //       }
  //     })

  //     if (response.status === 200) {
  //       const houses = await response.json()
  //       setAllHouses(houses)
  //     } else {
  //       setAllHouses([])
  //     }
  //   }
  //   fetcher()
  // }, [userName])

  // useEffect(() => {
  //   const filtered = allHouses.filter((house) => house.owner === userName)
  //   setFilteredHouses(filtered)
  // }, [allHouses, userName])

  return (
    <div className={styles.houseDiv}>
       {filteredHouses.map((house) => (
        <div key={house.id}>
          <HouseCard house={house}></HouseCard>
        </div>
       ))}
    </div>
  )
}

export default PrintUserHouses
