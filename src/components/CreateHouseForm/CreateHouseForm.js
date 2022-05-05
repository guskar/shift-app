import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import { getAccessToken } from '../../utils/auth'
import styles from './style.module.css'

const CreateHouseForm = () => {
  const navigate = useNavigate()
  const [location, setLocation] = useState('')
  const [imageUrl, setimageUrl] = useState('')
  const [description, setDescription] = useState('')
  const [hasPool, sethasPool] = useState(false)
  const [hasWifi, sethasWifi] = useState(false)
  const [hasTv, sethasTv] = useState(false)
  const [createHouseFailed, setCreateHouseFailed] = useState(false)
  const [nrOfRooms, setNrOfRooms] = useState('')
  const [nrOfBeds, setNrOfBeds] = useState('')

  const handleSubmit = async (event) => {

    event.preventDefault();
    const body = { location, imageUrl, description, hasPool, hasWifi, hasTv, nrOfRooms, nrOfBeds };

    // 'http://localhost:8081/api/v1/houses'
    // 'https://cscloud8-44.lnu.se/shift/api/v1/houses'

    const response = await fetch('http://localhost:8081/api/v1/houses', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getAccessToken()}`
      },
      body: JSON.stringify(body)
    })

    if (response.status === 201) {
      navigate('/profile')

    } else {
      setCreateHouseFailed(true)
    }



  }


  return (

    <form onSubmit={handleSubmit} className={styles.formDiv}>
      <label>Location</label>
      <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} />

      <label>Description</label>
      <textarea rows='10' value={description} onChange={(e) => setDescription(e.target.value)}></textarea>

      <label>ImageUrl</label>
      <input type="text" value={imageUrl} onChange={(e) => setimageUrl(e.target.value)} />

      <label htmlFor="rooms">Number of rooms:</label>
      <select value={nrOfRooms} onChange={(e) => setNrOfRooms(e.target.value)} name="rooms" id="rooms">
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
        <option value="7">7</option>
        <option value="8">8</option>
      </select>

      <label htmlFor="beds">Number of beds:</label>
      <select value={nrOfBeds} onChange={(e) => setNrOfBeds(e.target.value)} name="beds" id="beds">
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
        <option value="7">7</option>
        <option value="8">8</option>
      </select>

      <label>Pool</label>
      <input type="checkbox" value='pool' checked={hasPool} onChange={(e) => sethasPool(!hasPool)} />

      <label>Wifi</label>
      <input type="checkbox" value='Wifi' checked={hasWifi} onChange={(e) => sethasWifi(!hasWifi)} />

      <label>Tv</label>
      <input type="checkbox" value='Tv' checked={hasTv} onChange={(e) => sethasTv(!hasTv)} />

      {createHouseFailed && <h4>Create house failed. Make sure every inputfield is filled in!</h4>}

      <button>Submit</button>

    </form>


  )
}

export default CreateHouseForm