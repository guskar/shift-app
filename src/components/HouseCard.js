
import { useState } from "react"
const HouseCard = () => {
  const [houses, setHouses] = useState([])

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
  console.log(houses)
  
  return (
   
    <div>
       {houses.map((house) => (
        <div key={house.id}>
          <h3>{house.location}</h3>
          <h5>{house.description}</h5>
          <h5>{house.pool? 'pool' : ''}</h5>
          <h5>{house.wifi? 'wifi': ''}</h5>
          <h5>{house.tv? 'tv': ''}</h5>

        </div>
      ))}

        <button onClick={fetcher}>Show houses</button>
    </div>
  )
}

export default HouseCard