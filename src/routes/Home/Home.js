import { useEffect, useState } from "react"
import HouseCard from "../../components/HouseCard/HouseCard"

const Home = () => {
  const [houses, setHouses] = useState([])

 useEffect(() => {
  const fetcher = async () => {
    const response = await fetch('http://localhost:8081/api/v1/houses/', {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJndXJrYW4iLCJnaXZlbl9uYW1lIjoiR3VzdGF2IiwiZmFtaWx5X25hbWUiOiJLYXJsYmVyZyIsImVtYWlsIjoiZ2hqa2doZ2prMkBzdHVkZW50LmxudS5zZSIsImlhdCI6MTY0OTM5OTQzNSwiZXhwIjoxNjQ5NDM1NDM1fQ.f6eXVNIqxWtYSkurKXwWilcK9bj6-J5hmR7g7tYEcboh0E5G9iTUcUHs_0ymOBXtWHQVwk4P4hhKL7DgyaeAbtesr8BV1p9NNPpAxBOJEHhTor_TvMnJvxcl_pnwtkjDXXf7iwGsZsheMDSq__OKy-EcqGWTW9IbIdRa8iL8FhXhnxCmQhNWJ95fSIMzd17I0m5D7_WrMTyczo-lSJrMOrTPf_XlaFySOCWK8Oq2J96HhNB1PR4TrVCPWAY28rL4j9dVtaFGY0y6hiYSWRaqEuBp-bxkyN1g17i5RdhhjvWLXw0msn8ieDBfDzLMUTFkobigDVaZIlXPWlQWIR_yOA'
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