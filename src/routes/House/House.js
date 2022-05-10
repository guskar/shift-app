import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { getAccessToken, getLoggedInUserName } from '../../utils/auth'
import { useNavigate } from 'react-router'
import styles from './style.module.css'
import Comments from '../../components/Comments/Comments'
import UpdateHouseForm from '../../components/UpdateHouseForm/UpdateHouseForm'
import { MdPool } from 'react-icons/md'
import { MdWifi } from 'react-icons/md'
import { FiMonitor } from 'react-icons/fi'
import { MdBed } from 'react-icons/md'
import { FaWheelchair } from 'react-icons/fa'
import Map from '../../components/Map/Map'







const House = () => {
  
  const navigate = useNavigate()
  const [house, setHouse] = useState([])
  const [conversations, setConversations] = useState({})
  const [openConversation, setOpenConversation] = useState()
  const [message, setMessage] = useState('')
  const [showEditHouse, setShowEditHouse] = useState(false)
  const [requestMade, setRequestMade] = useState('')
  const [dateFrom, setDateFrom] = useState('')
  const [dateTo, setDateTo] = useState('')

  const {
    id
  } = useParams('/houses/:id')


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
        'Authorization': `Bearer ${getAccessToken()}`
      },
      body: JSON.stringify(commentBody)
    })



  }

  const reply = async (conversationId, comment) => {
    const commentBody = {
      conversationId: conversationId,
      comment: comment
    }
    // `https://cscloud8-44.lnu.se/shift/api/v1/houses/${id}/comment`
    // `http://localhost:8081/api/v1/houses/${id}/comment`
    await fetch(`https://cscloud8-44.lnu.se/shift/api/v1/houses/${id}/comment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getAccessToken()}`
      },
      body: JSON.stringify(commentBody)
    })

    setMessage('')


  }

  const deleteHouse = async () => {
    // `https://cscloud8-44.lnu.se/shift/api/v1/houses/${id}`
    // `http://localhost:8081/api/v1/houses/${id}`
    const response = await fetch(`https://cscloud8-44.lnu.se/shift/api/v1/houses/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${getAccessToken()}`
      }
    })

    if (response.status === 204) {
      navigate('/profile')
    }



  }

  const editHouse = () => {

    setShowEditHouse(!showEditHouse)

  }



  useEffect(() => {


    const fetcher = async () => {
      // `http://localhost:8081/api/v1/houses/${id}`
      // `https://cscloud8-44.lnu.se/shift/api/v1/houses/${id}`

      const response = await fetch(`https://cscloud8-44.lnu.se/shift/api/v1/houses/${id}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${getAccessToken()}`
        }
      })

      if (response.status === 200) {
        const _conversations = {}

        const json = await response.json()

        json.comments.forEach(comment => {
          if (!_conversations[comment.conversationid]) {
            _conversations[comment.conversationid] = []
          }
          setRequestMade(true)
          _conversations[comment.conversationid].push(comment)
        });

        setConversations(_conversations)
        setHouse(json.house)
      }
    }

    fetcher();
  }, [id])


  return (
    <div className={styles.specificHouseDiv}>
      <img src={house.imageUrl} alt='' className={styles.img} />

      <div className={styles.infoDiv}>
        <div>
          <h1>{house.location}</h1>
          <pre><p>{house.description}</p></pre>
          <h2>{house.owner}</h2>
          <div className={styles.iconsDiv}>
            <h5>{house.pool ? <MdPool className={styles.icons}></MdPool> : ''}</h5>
            <h5>{house.wifi ? <MdWifi className={styles.icons}></MdWifi> : ''}</h5>
            <h5>{house.tv ? <FiMonitor className={styles.icons}></FiMonitor> : ''}</h5>
            <h5>{house.wheelchairAccessible ? <FaWheelchair className={styles.icons}></FaWheelchair> : ''}</h5>
            <h5>{<MdBed className={styles.icons}></MdBed>} {house.beds}</h5>
            <h5 className={styles.text}>{`Rooms: ${house.rooms}`} </h5>
            <h5 className={styles.text}>{house.borrow ? 'Free to borrow': ''}</h5>
          </div> 
        </div>

        {house.owner === getLoggedInUserName()? '': <Map></Map>}

        {(house.owner !== getLoggedInUserName() && !requestMade) && (
          <div className={styles.buttonsDiv}>
            <button onClick={makeRequest}>
              Make request
            </button>
            <label>From</label>
            <input type='date' onChange={(e) =>setDateFrom(e.target.value)}/>
            <label>To</label>
            <input type='date'onChange={(e) =>setDateTo(e.target.value)} />
          </div>
        )}
        {house.owner === getLoggedInUserName() && (
          <div className={styles.buttonsDiv}>
            <button onClick={deleteHouse}>
              Delete house
            </button>
            <button onClick={editHouse}>
              Edit house
            </button>
          </div>
        )}
        <div>
          {showEditHouse && <UpdateHouseForm house={house}></UpdateHouseForm>}
          {showEditHouse && <button onClick={() => setShowEditHouse(!showEditHouse)}>Close</button>}
        </div>

      </div>

      {Object.keys(conversations).map((conversationId) => (
        conversationId === openConversation ? (
          <div key={conversationId} className={styles.commentsDiv} >
            {conversations[conversationId].map((comment, index) => (
              <div key={index}>
               {comment.username === getLoggedInUserName()? <Comments color='rgb(117, 145, 69)' comment={comment} house={house}></Comments> : <Comments color='#206040' comment={comment} house={house}></Comments>} 
              </div>
            ))}
            <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} />
            <button onClick={() => reply(conversationId, message)}>Send message</button>
            <button onClick={() => setOpenConversation('')}>Close conversation</button>
          </div>
        ) : (
          <div key={conversationId} className={styles.commentsDiv}>
            <button onClick={() => setOpenConversation(conversationId)}>{conversationId}</button>
          </div>
        )
      ))}
    </div>
  )
}

export default House