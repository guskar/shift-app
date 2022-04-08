import React, { useState } from 'react'
import styles from './style.module.css'

const CreateHouseForm = () => {

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
        'Authorization': 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJndXJrYW4iLCJnaXZlbl9uYW1lIjoiR3VzdGF2IiwiZmFtaWx5X25hbWUiOiJLYXJsYmVyZyIsImVtYWlsIjoiZ2hqa2doZ2prMkBzdHVkZW50LmxudS5zZSIsImlhdCI6MTY0OTM5OTQzNSwiZXhwIjoxNjQ5NDM1NDM1fQ.f6eXVNIqxWtYSkurKXwWilcK9bj6-J5hmR7g7tYEcboh0E5G9iTUcUHs_0ymOBXtWHQVwk4P4hhKL7DgyaeAbtesr8BV1p9NNPpAxBOJEHhTor_TvMnJvxcl_pnwtkjDXXf7iwGsZsheMDSq__OKy-EcqGWTW9IbIdRa8iL8FhXhnxCmQhNWJ95fSIMzd17I0m5D7_WrMTyczo-lSJrMOrTPf_XlaFySOCWK8Oq2J96HhNB1PR4TrVCPWAY28rL4j9dVtaFGY0y6hiYSWRaqEuBp-bxkyN1g17i5RdhhjvWLXw0msn8ieDBfDzLMUTFkobigDVaZIlXPWlQWIR_yOA'
      },
      body: JSON.stringify(body)
    })


  }
  

  return (

    
      <form onSubmit={handleSubmit} className={styles.houseForm}>
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

export default CreateHouseForm