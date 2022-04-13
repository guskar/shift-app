import { useEffect, useState } from 'react'
import { getAccessToken } from '../../utils/auth'
import { useIsLoggedIn } from '../../utils/utilhooks'
import HouseCard from '../HouseCard/HouseCard'
import styles from './style.module.css'


const PrintHouses = () => {

  const [allHouses, setAllHouses] = useState([])
  const [filteredHouses, setFilteredHouses] = useState([])
  const [searchFor, setSearchFor] = useState('')
 

  const isLoggedIn = useIsLoggedIn()


  useEffect(() => {

    const accessToken = getAccessToken()

    // const splittedAcces = accessToken.split('.')
    // var encodedStringAtoB = splittedAcces[1];
    // var decodedStringAtoB = atob(encodedStringAtoB);
    // console.log("this is the access token in json", decodedStringAtoB)
    // const data = JSON.parse(decodedStringAtoB)
    // setUsername(data.sub)
    // console.log(userName)
    

    const fetcher = async () => {
      // const response = await fetch('https://cscloud8-44.lnu.se/shift/api/v1/houses'
      const response = await fetch('http://localhost:8081/api/v1/houses', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      })

      if (response.status === 200) {
        const houses = await response.json()
        setAllHouses(houses)
      } else {
        setAllHouses([])
      }

    }
    fetcher();
  }, [isLoggedIn])

  useEffect(() => {
    const filtered = allHouses.filter((house) => house.location.indexOf(searchFor) !== -1)
    setFilteredHouses(filtered)
  }, [allHouses, searchFor])

  return (
    <div className={styles.houseDiv} >
      
        <input type="text" value={searchFor} placeholder='Where to go?' onChange={(e) => setSearchFor(e.target.value)} />
      

      {filteredHouses.map((house) => (
        <div key={house.id}>
          <HouseCard house={house}></HouseCard>
        </div>
      ))}
    </div>
  )
}

export default PrintHouses