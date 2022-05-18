import React, { useEffect, useState } from 'react'
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

/**
 * A route for rendering the house page.
 *
 * @returns {React.ReactElement} The housepage.
 */
const House = () => {
  const navigate = useNavigate()
  const [house, setHouse] = useState([])
  const [showEditHouse, setShowEditHouse] = useState(false)
  const [requestMade, setRequestMade] = useState(false)
  const [dateFrom, setDateFrom] = useState('')
  const [dateTo, setDateTo] = useState('')
  const [houseDeleted, setHouseDeleted] = useState(false)
  const [conversations, setConversations] = useState({})

  const {
    id
  } = useParams('/houses/:id')

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
    await fetch(`https://cscloud8-44.lnu.se/shift/api/v1/houses/${id}/comment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getAccessToken()}`
      },
      body: JSON.stringify(commentBody)
    })
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
  const editHouse = () => {
    setShowEditHouse(!showEditHouse)
  }

  useEffect(() => {
    /**
     * Fetches the current house from resource api.
     */
    const fetcher = async () => {
      // `http://localhost:8081/api/v1/houses/${id}`
      // `https://cscloud8-44.lnu.se/shift/api/v1/houses/${id}`

      const response = await fetch(`https://cscloud8-44.lnu.se/shift/api/v1/houses/${id}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${getAccessToken()}`
        }
      })

      if (response.status === 200) {
        const _conversations = {}

        const json = await response.json()

        json.comments.forEach(comment => {
          if (!_conversations[comment.conversationid]) {
            _conversations[comment.conversationid] = []
            setRequestMade(true)
          }
          _conversations[comment.conversationid].push(comment)
        })

        setConversations(_conversations)
        setHouse(json.house)
      }
    }

    fetcher()
  }, [id])

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
          <h2>{house.owner}</h2>
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
        {houseDeleted && <FlashMessage message={'House has been deleted successfully'} show={true} type={'success'}></FlashMessage>}

        {isUsersHouse
          ? <>
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
              <div className={styles.buttonsDiv}>
                <button onClick={deleteHouse}>
                  Delete house
                </button>
                <button onClick={editHouse}>
                  Edit house
                </button>
              </div>
            </>
          : <Map location={house.location}></Map>
        }
        <div>
          {showEditHouse && <UpdateHouseForm house={house}></UpdateHouseForm>}
          {showEditHouse && <button onClick={() => setShowEditHouse(!showEditHouse)}>Close</button>}
        </div>

      </div>

      <Comments id={id} conversations={conversations} house={house} />
    </div>
  )
}

export default House
