import { useEffect, useState } from "react"
import HouseCard from "../../components/HouseCard/HouseCard"
import { getAccessToken } from "../../utils/auth"
import { useIsLoggedIn } from "../../utils/utilhooks"

const Home = () => {
  const [houses, setHouses] = useState([])
  const isLoggedIn = useIsLoggedIn()

  useEffect(() => {
    const accessToken = getAccessToken()
    console.log("this is the access token", accessToken)

    const fetcher = async () => {
      const response = await fetch('https://cscloud8-44.lnu.se/shift/api/v1/houses', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      })

      if (response.status === 200) {
        const houses = await response.json()
        setHouses(houses)
      }
        
    }
    fetcher();
  }, [isLoggedIn])
  
  return (
   
    <div id= 'houseDiv'>
      <div id= 'backgroundDiv'>
        <h1>Shift-Make a change today</h1>
      </div>
      {!isLoggedIn && <h2>Your should register!</h2>}
      
       {houses.map((house) => (
        <div key={house.id}>
          <HouseCard house={house}></HouseCard>
        </div>
      ))}
     
    </div>
  )
}

export default Home