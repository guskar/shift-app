import { useEffect, useState } from "react"
import HouseCard from "../../components/HouseCard/HouseCard.js"

const Home = () => {
  const [houses, setHouses] = useState([])

 useEffect(() => {
  const fetcher = async () => {
    const response = await fetch('http://localhost:8081/api/v1/houses/', {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJndXJrYW4iLCJnaXZlbl9uYW1lIjoiR3VzdGF2IiwiZmFtaWx5X25hbWUiOiJLYXJsYmVyZyIsImVtYWlsIjoiZ2hqa2doZ2prMkBzdHVkZW50LmxudS5zZSIsImlhdCI6MTY0OTMxNjM3NiwiZXhwIjoxNjQ5MzUyMzc2fQ.PJ9tDqbEgSiGItGeoDYP4P863mvlwjA6aIgsUZ5jFM6XJAh8IhaGZq1No9EuHPCSbTy9FxaN_Ib57insUSoNFVjRpsIcKNCy4rgVbKVykdOnJyGdgSv3bTw1yhGCWVlTfYk4zAAzigDJepHq1W8bpzmJZHTX-HVHqUxX2EKsEcuSwTWfc4HHeFXXujgg8FGkOXRGp447MtVCfcK0mdU9suKn1SQs9Y8mvw5C1_LpCgfljuXbKT_dXJMUO8OV_y24JVwMQ0yOl3Lej0zQAXFr6EjuiM_C3G2qMGbyJy38jJiqVC6_2kZ5G26skAlTPHryNoYM0JA_Fs-Cpns9sRvjhw'
      }
    })

    if (response.status === 200) {
      const houses = await response.json()
      setHouses(houses)
    }
      
  }
  fetcher();
 }, [])
  
  
  return (
   
    <div id= 'houseDiv'>
       {houses.map((house) => (
        <div key={house.id}>
          <HouseCard house={house}></HouseCard>
        </div>
      ))}

    </div>
  )
}

export default Home