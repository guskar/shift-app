import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import { getAccessToken } from '../../utils/auth'
import { useIsLoggedIn } from '../../utils/utilhooks'
import styles from './style.module.css'

const CreateHouseForm = () => {
  const navigate = useNavigate()
  const isLoggedIn = useIsLoggedIn()
  const [location, setLocation] = useState('')
  const [imageUrl, setimageUrl] = useState('')
  const [description, setDescription] = useState('')
  const [hasPool, sethasPool] = useState(false)
  const [hasWifi, sethasWifi] = useState(false)
  const [hasTv, sethasTv] = useState(false)

  const handleSubmit = async (event) => {
   
    event.preventDefault();
    const body = {location, imageUrl, description, hasPool, hasWifi, hasTv};

    const accessToken = getAccessToken()
    // const response = await fetch('https://cscloud8-44.lnu.se/shift/api/v1/houses'
    const response = await fetch('http://localhost:8081/api/v1/houses', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      },
      body: JSON.stringify(body)
      
    })
   
    if(response.status === 201) {
     navigate('/')
      
    }
    


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