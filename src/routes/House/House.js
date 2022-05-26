import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router'
import { getAccessToken, getLoggedInUserName } from '../../utils/auth'
import styles from './style.module.css'
import Comments from '../../components/Comments/Comments'
import UpdateHouseForm from '../../components/UpdateHouseForm/UpdateHouseForm'
import { MdPool, MdWifi, MdBed } from 'react-icons/md'
import { FiMonitor } from 'react-icons/fi'
import { FaWheelchair } from 'react-icons/fa'
import Map from '../../components/Map/Map'
import FlashMessage from '../../components/FlashMessage/FlashMessage'
import { useHouse } from '../../utils/utilhooks'
import { backendFetch } from '../../utils/utils'

/**
 * A route for rendering the house page.
 *
 * @returns {React.ReactElement} The housepage.
 */
const House = () => {
  const navigate = useNavigate()
  const [showEditHouse, setShowEditHouse] = useState(false)
  const [dateFrom, setDateFrom] = useState('')
  const [dateTo, setDateTo] = useState('')
  const [houseDeleted, setHouseDeleted] = useState(false)
  const [requestFailed, setRequestFailed] = useState(false)
  const [requestSuccess, setRequesSuccess] = useState(false)

  const {
    id
  } = useParams('/houses/:id')

  const {
    house,
    conversations,
    requestMade,
    refetch
  } = useHouse(id)

  /**
   * Makes a post to resource api for adding a comment.
   */
  const makeRequest = async () => {
    const commentBody = {
      conversationId: getLoggedInUserName(),
      comment: `${getLoggedInUserName()} has made a request on this house between ${dateFrom} and ${dateTo}`
    }

    // `https://cscloud8-44.lnu.se/shift/api/v1/houses/${id}/comment`
    // `http://localhost:8081/api/v1/houses/${id}/comment`
    const response = await backendFetch(`houses/${id}/comment`, 'POST', commentBody)

    if (response.status === 201) {
      setRequesSuccess(true)
    } else {
      setRequestFailed(true)
    }
    await refetch()
  }

  /**
   * Makes a delete request to resource api to delete current house.
   */
  const deleteHouse = async () => {
    // `https://cscloud8-44.lnu.se/shift/api/v1/houses/${id}`
    // `http://localhost:8081/api/v1/houses/${id}`
    const response = await fetch(`https://cscloud8-44.lnu.se/shift/api/v1/houses/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${getAccessToken()}`
      }
    })

    if (response.status === 204) {
      setTimeout(() => {
        navigate('/userhouses')
      }, 2500
      )
      setHouseDeleted(true)
    }
  }

  /**
   * Sets the ShowEditHouse state.
   */
  const toggleEditingHouse = () => {
    setShowEditHouse(!showEditHouse)
  }

  if (!house) {
    return null
  }

  const isUsersHouse = house.owner === getLoggedInUserName()

  return (
    <div className={styles.specificHouseDiv}>
      <div className={styles.imageDiv}>
        <img src={house.imageUrl} alt='' className={styles.img} />
      </div>
      <div className={styles.infoDiv}>
        <div>
          <h1>{house.location}</h1>
          <pre><p>{house.description}</p></pre>
          <h2>Houseowner: {house.owner}</h2>
          <div className={styles.iconsDiv}>
            {house.pool ? <MdPool className={styles.icons}></MdPool> : null}
            {house.wifi ? <MdWifi className={styles.icons}></MdWifi> : null}
            {house.tv ? <FiMonitor className={styles.icons}></FiMonitor> : null}
            {house.wheelchairAccessible ? <FaWheelchair className={styles.icons}></FaWheelchair> : null}
            <h5>{<MdBed className={styles.icons}></MdBed>} {house.beds}</h5>
            <h5 className={styles.text}>{`Rooms: ${house.rooms}`} </h5>
            {house.borrow ? <h5 className={styles.text}>Free to borrow</h5> : null}
          </div>
        </div>
        {isUsersHouse
          ? <div className={styles.buttonsDiv}>
            <button onClick={deleteHouse}>
              Delete house
            </button>
            <button onClick={toggleEditingHouse}>
              Edit house
            </button>
          </div>
          : <div className={styles.infoDivInner}>
            <Map location={house.location}></Map>
            {!requestMade &&
              <div className={styles.buttonsDiv}>
                <label>From</label>
                <input type='date' onChange={(e) => setDateFrom(e.target.value)} />
                <label>To</label>
                <input type='date' onChange={(e) => setDateTo(e.target.value)} />
                <button onClick={makeRequest}>
                  Make request
                </button>
              </div>
            }
          </div>
        }
      </div>
      <div className={styles.formDiv}>
        {showEditHouse && <UpdateHouseForm house={house}></UpdateHouseForm>}
        {showEditHouse && <button className={styles.closeBtn} onClick={() => setShowEditHouse(!showEditHouse)}>X</button>}
      </div>
      {houseDeleted && <FlashMessage message={'House has been deleted successfully'} show={true} type={'success'}></FlashMessage>}
      {requestSuccess && <FlashMessage message={'A request has been made successfully'} show={true} type={'success'}></FlashMessage>}
      {requestFailed && <FlashMessage message={'The request failed.'} show={true} type={'success'}></FlashMessage>}
      {requestMade && <h4>Conversations</h4>}
      <Comments id={id} conversations={conversations} house={house} refetch={refetch} />
    </div>
  )
}

export default House
