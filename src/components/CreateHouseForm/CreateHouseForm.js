import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import { backendFetch } from '../../utils/utils'
import FlashMessage from '../FlashMessage/FlashMessage'
import styles from './style.module.css'
/**
 * A Createhouse Component returning a form for adding a house.
 *
 * @returns {React.ReactElement} The add house form.
 */
const CreateHouseForm = () => {
  const navigate = useNavigate()
  const [location, setLocation] = useState('')
  const [imageUrl, setimageUrl] = useState('')
  const [description, setDescription] = useState('')
  const [hasPool, sethasPool] = useState(false)
  const [hasWifi, sethasWifi] = useState(false)
  const [hasTv, sethasTv] = useState(false)
  const [createHouseFailed, setCreateHouseFailed] = useState('')
  const [createHouseSuccess, setCreateHouseSuccess] = useState('')
  const [nrOfRooms, setNrOfRooms] = useState('')
  const [nrOfBeds, setNrOfBeds] = useState('')
  const [wheelchairAccessible, setwheelchairAccessible] = useState(false)
  const [borrow, setBorrow] = useState(false)
  /**
   * Handles submit of the event.
   *
   * @type {object} The event.
   */
  const handleSubmit = async (event) => {
    event.preventDefault()
    const body = { location, imageUrl, description, hasPool, hasWifi, hasTv, nrOfRooms, nrOfBeds, borrow, wheelchairAccessible }

    // 'http://localhost:8081/api/v1/houses'
    // 'https://cscloud8-44.lnu.se/shift/api/v1/houses'

    const response = await backendFetch('houses', 'POST', body)

    if (response.status === 201) {
      setTimeout(() => {
        navigate('/userhouses')
      }, 2500
      )
      setCreateHouseSuccess(true)
    } else {
      setCreateHouseFailed(true)
    }
  }

  return (

    <form onSubmit={handleSubmit} className={styles.formDiv}>

      <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} placeholder= 'Adress' required />

      <textarea rows='10' value={description} onChange={(e) => setDescription(e.target.value)} placeholder= 'Description' required></textarea>

      <input type="text" value={imageUrl} onChange={(e) => setimageUrl(e.target.value)} placeholder= 'ImageUrl' required />

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

      <label>Free to borrow</label>
      <input type="checkbox" value='borrow' checked={borrow} onChange={(e) => setBorrow(!borrow)} />

      <label>Wheelchair-Accessible</label>
      <input type="checkbox" value='Wheelchair-Accessible' checked={wheelchairAccessible} onChange={(e) => setwheelchairAccessible(!wheelchairAccessible)} />

      <label>Pool</label>
      <input type="checkbox" value='pool' checked={hasPool} onChange={(e) => sethasPool(!hasPool)} />

      <label>Wifi</label>
      <input type="checkbox" value='Wifi' checked={hasWifi} onChange={(e) => sethasWifi(!hasWifi)} />

      <label>Tv</label>
      <input type="checkbox" value='Tv' checked={hasTv} onChange={(e) => sethasTv(!hasTv)} />

      {createHouseFailed && <FlashMessage message={'Add house failed, please check that all inputs are filled in'} show={true} type={'error'}></FlashMessage>}
      {createHouseSuccess && <FlashMessage message={'The house was added successfully'} show={true} type={'error'}></FlashMessage>}

      <button>Create house</button>

    </form>
  )
}

export default CreateHouseForm
