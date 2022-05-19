import { React, useEffect, useState } from 'react'
import { getLoggedInUserName } from '../../utils/auth'
import { useIsLoggedIn } from '../../utils/utilhooks'
import { backendFetch } from '../../utils/utils'
import HouseCard from '../HouseCard/HouseCard'
import styles from './style.module.css'
/**
 * A Component that renders all houses.
 *
 * @returns {React.ReactElement} The Printhouses component.
 */
const PrintHouses = () => {
  const [allHouses, setAllHouses] = useState([])
  const [filteredHouses, setFilteredHouses] = useState([])
  const [searchFor, setSearchFor] = useState('')

  const isLoggedIn = useIsLoggedIn()

  useEffect(() => {
    // 'https://cscloud8-44.lnu.se/shift/api/v1/houses'
    // 'http://localhost:8081/api/v1/houses'

    /**
     * Fetches the houses from api.
     */
    const fetcher = async () => {
      const response = await backendFetch('houses', 'GET')

      if (response.status === 200) {
        const houses = await response.json()
        setAllHouses(houses)
      } else {
        setAllHouses([])
      }
    }
    fetcher()
  }, [isLoggedIn])

  useEffect(() => {
    const userName = getLoggedInUserName()
    const filtered = allHouses.filter((house) => house.owner !== userName).filter((house) => house.location.toLowerCase().indexOf(searchFor.toLowerCase()) !== -1)
    setFilteredHouses(filtered)
  }, [allHouses, searchFor])

  return (
    <>
      <input className={styles.input} type="text" value={searchFor} placeholder='Where to go?' onChange={(e) => setSearchFor(e.target.value)} />
      <div className={styles.houseDiv} >
        {filteredHouses.map((house) => (
          <div key={house.id}>
            <HouseCard house={house}></HouseCard>
          </div>
        ))}
      </div>
    </>
  )
}

export default PrintHouses
