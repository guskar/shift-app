import { useEffect, useState } from 'react'
import { getLoggedInUserName } from '../../utils/auth'
import { backendFetch } from '../../utils/utils'

/**
 * A component that prints all Userhouses.
 *
 * @returns {object} The variables to use rendering the PrintUserHouses.
 */
const useUserHouses = () => {
  const [allHouses, setAllHouses] = useState([])
  const [filteredHouses, setFilteredHouses] = useState([])
  const [userName, setUsername] = useState('')

  useEffect(() => {
    setUsername(getLoggedInUserName())

    // 'https://cscloud8-44.lnu.se/shift/api/v1/houses'
    // 'http://localhost:8081/api/v1/houses'

    /**
     * Fetches all userhouses from api.
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
  }, [userName])

  useEffect(() => {
    const filtered = allHouses.filter((house) => house.owner === userName)
    setFilteredHouses(filtered)
  }, [allHouses, userName])

  return { allHouses, userName, filteredHouses }
}

export default useUserHouses
