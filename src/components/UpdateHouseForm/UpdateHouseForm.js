import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { backendFetch } from '../../utils/utils'
import FlashMessage from '../FlashMessage/FlashMessage'
import styles from './style.module.css'
/**
 * A component rendering a form for updating a house.
 *
 * @type {object} Props.
 * @returns {React.ReactElement} The update house form.
 */
function UpdateHouseForm ({ house }) {
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
  const [nrOfRooms, setNrOfRooms] = useState('')
  const [nrOfBeds, setNrOfBeds] = useState('')
  const [wheelchairAccessible, setwheelchairAccessible] = useState(false)
  const [borrow, setBorrow] = useState(false)
  const [updateHouseFailed, setUpdateHouseFailed] = useState('')
  const [updateHouseSuccess, setUpdateHouseSuccess] = useState('')

  useEffect(() => {
    setLocation(house.location)
    setimageUrl(house.imageUrl)
    setDescription(house.description)
    setPool(house.pool)
    setWifi(house.wifi)
    setTV(house.tv)
    setNrOfRooms(house.rooms)
    setNrOfBeds(house.beds)
    setwheelchairAccessible(house.wheelchairAccessible)
    setBorrow(house.borrow)
  }, [house])

  /**
   * Handles the submit of updateform.
   *
   * @param {object} event The event object.
   */
  const handleSubmit = async (event) => {
    event.preventDefault()
    const body = {
      location,
      imageUrl,
      description,
      pool,
      wifi,
      tv,
      nrOfRooms,
      nrOfBeds,
      wheelchairAccessible,
      borrow

    }
    // `https://cscloud8-44.lnu.se/shift/api/v1/houses/${id}`
    // `http://localhost:8081/api/v1/houses/${id}`

    const response = await backendFetch(`houses/${id}`, 'PUT', body)

    if (response.status === 204) {
      setTimeout(() => {
        navigate('/userhouses')
      }, 2000
      )
      setUpdateHouseSuccess(true)
    } else {
      setUpdateHouseFailed(true)
    }
  }

  return (
    <div>
      <form className={styles.formDiv} onSubmit={handleSubmit} >
      <label>Location</label>
      <input type="text" value={location} onChange={(e) => setLocation(e.target.value)}required />

      <label>Description</label>
      <textarea rows='10' value={description} onChange={(e) => setDescription(e.target.value)} required></textarea>

      <label>ImageUrl</label>
      <input type="text" value={imageUrl} onChange={(e) => setimageUrl(e.target.value)} required/>

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
      <input type="checkbox" value='pool' checked={pool} onChange={(e) => setPool(!pool)} />

      <label>Wifi</label>
      <input type="checkbox" value='Wifi' checked={wifi} onChange={(e) => setWifi(!wifi)} />

      <label>Tv</label>
      <input type="checkbox" value='Tv' checked={tv} onChange={(e) => setTV(!tv)} />

      {updateHouseFailed && <FlashMessage message={'Edit house failed, please check that all inputs are filled in'} show={true} type={'error'}></FlashMessage>}
      {updateHouseSuccess && <FlashMessage message={'The house was updated successfully'} show={true} type={'error'}></FlashMessage>}

      <button className={styles.Btn}>Submit</button>

      </form>

    </div>
  )
}

export default UpdateHouseForm
