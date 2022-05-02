import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { getAccessToken } from '../../utils/auth'
import styles from './style.module.css'


function UpdateHouseForm({ house }) {

  const {
    id
  } = useParams('/houses/:id')
 

  const navigate = useNavigate()
  const [location, setLocation] = useState(house.location)
  const [imageUrl, setimageUrl] = useState(house.imageUrl)
  const [description, setDescription] = useState(house.description)
  const [pool, setPool] = useState(house.pool)
  const [wifi, setWifi] = useState(house.wifi)
  const [tv, setTV] = useState(house.tv)
  const [updateHouseFailed, setUpdateHouseFailed] = useState(false)

  useEffect(() => {
    setLocation(house.location)
    setimageUrl(house.imageUrl)
    setDescription(house.description)
    setPool(house.pool)
    setWifi(house.wifi)
    setTV(house.tv)
  }, [house])

  const handleSubmit = async (event) => {
    event.preventDefault();
    const body = {
      location, 
      imageUrl, 
      description, 
      pool,
      wifi,
      tv
    }
    
    // `http://localhost:8081/api/v1/houses/${id}`
   
    const response = await fetch(`https://cscloud8-44.lnu.se/shift/api/v1/houses/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getAccessToken()}`
      },
      body: JSON.stringify(body)
    })
   
    if(response.status === 204) {
     navigate('/profile')
       
    } else {
      setUpdateHouseFailed(true)
    }
  }

  return (
    <div>
      <form className={styles.formDiv} onSubmit={handleSubmit} >
       <label>Location</label>
       <input type="text" value={location}  onChange={(e) => setLocation(e.target.value)} />

       <label>Description</label>
       <textarea rows='10' onChange={(e) => setDescription(e.target.value)}>{description}</textarea>

       <label>ImageUrl</label>
       <input type="text" value={imageUrl} onChange={(e) => setimageUrl(e.target.value)} />

       <label>Pool</label>
       <input type="checkbox" checked={pool} onChange={(e) => setPool(!pool)}/>

       <label>Wifi</label>
       <input type="checkbox" checked={wifi} onChange={(e) => setWifi(!wifi)}/>

       <label>Tv</label>
       <input type="checkbox" checked={tv} onChange={(e) => setTV(!tv)}/>

       {updateHouseFailed && <h4>Update house failed. Make sure every inputfield is filled in!</h4>}

      
       <button>Submit</button>
       
      </form>
      
    </div>
  )
}

export default UpdateHouseForm