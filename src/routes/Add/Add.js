import React, { useState } from 'react'

const Add = () => {

  const [location, setLocation] = useState('')
  const [imageUrl, setimageUrl] = useState('')
  const [description, setDescription] = useState('')
  const [hasPool, sethasPool] = useState(false)
  const [hasWifi, sethasWifi] = useState(false)
  const [hasTv, sethasTv] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault();
    const body = {location, imageUrl, description, hasPool, hasWifi, hasTv};

    
    await fetch('http://localhost:8081/api/v1/houses/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJndXJrYW4iLCJnaXZlbl9uYW1lIjoiR3VzdGF2IiwiZmFtaWx5X25hbWUiOiJLYXJsYmVyZyIsImVtYWlsIjoiZ2hqa2doZ2prMkBzdHVkZW50LmxudS5zZSIsImlhdCI6MTY0OTMxNjM3NiwiZXhwIjoxNjQ5MzUyMzc2fQ.PJ9tDqbEgSiGItGeoDYP4P863mvlwjA6aIgsUZ5jFM6XJAh8IhaGZq1No9EuHPCSbTy9FxaN_Ib57insUSoNFVjRpsIcKNCy4rgVbKVykdOnJyGdgSv3bTw1yhGCWVlTfYk4zAAzigDJepHq1W8bpzmJZHTX-HVHqUxX2EKsEcuSwTWfc4HHeFXXujgg8FGkOXRGp447MtVCfcK0mdU9suKn1SQs9Y8mvw5C1_LpCgfljuXbKT_dXJMUO8OV_y24JVwMQ0yOl3Lej0zQAXFr6EjuiM_C3G2qMGbyJy38jJiqVC6_2kZ5G26skAlTPHryNoYM0JA_Fs-Cpns9sRvjhw'
      },
      body: JSON.stringify(body)
    })


  }
  

  return (
   <form onSubmit={handleSubmit}>
     <label>Location</label>
       <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} />

       <label>Description</label>
       <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />

       <label>ImageUrl</label>
       <input type="text" value={imageUrl} onChange={(e) => setimageUrl(e.target.value)} />

       <label>Pool</label>
       <input type="checkbox" value='pool' checked={hasPool} onChange={(e) => sethasPool(!hasPool)}/>

       <label>Wifi</label>
       <input type="checkbox" value='Wifi'checked={hasWifi} onChange={(e) => sethasWifi(!hasWifi)}/>

       <label>Tv</label>
       <input type="checkbox" value='Tv' checked={hasTv} onChange={(e) => sethasTv(!hasTv)}/>

       <button>Submit</button>
    

   </form>
  )
}

export default Add