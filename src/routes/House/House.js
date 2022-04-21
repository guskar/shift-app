import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { getAccessToken, getLoggedInUserName } from '../../utils/auth'
import { useNavigate } from 'react-router'
import styles from './style.module.css'
import Comments from '../../components/Comments/Comments'



const House = () => {
  const navigate = useNavigate()
  const [house, setHouse] = useState([])
  const [conversations, setConversations] = useState({})
  const [openConversation, setOpenConversation] = useState()
  const [message, setMessage] = useState('')

  const {
    id
  } = useParams('/houses/:id')

  const addComment = async () => {
    const commentBody = {
      conversationId: getLoggedInUserName(),
      comment: `${getLoggedInUserName()} has made a request on this house`
    }

    const response = await fetch(`http://localhost:8081/api/v1/houses/${id}/comment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getAccessToken()}`
      },
      body: JSON.stringify(commentBody)
    })

    if (response.status === 201) {
      window.location.reload(false)
    }


  }

  const reply = async (conversationId, comment) => {
    const commentBody = {
      conversationId: conversationId,
      comment: comment
    }

    const response = await fetch(`http://localhost:8081/api/v1/houses/${id}/comment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getAccessToken()}`
      },
      body: JSON.stringify(commentBody)
    })


  }

  const deleteHouse = async () => {
    const response = await fetch(`http://localhost:8081/api/v1/houses/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${getAccessToken()}`
      }
    })
    console.log(response.status)
    if (response.status === 204) {
      navigate('/profile')
    }



  }



  useEffect(() => {
    const accessToken = getAccessToken()

    const fetcher = async () => {

      // const response = await fetch('https://cscloud8-44.lnu.se/shift/api/v1/houses'
      const response = await fetch(`http://localhost:8081/api/v1/houses/${id}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      })

      if (response.status === 200) {
        const _conversations = {}

        const json = await response.json()

        json.comments.forEach(comment => {
          if (!_conversations[comment.conversationid]) {
            _conversations[comment.conversationid] = []
          }

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
      <img src={house.imageUrl} alt='' className={styles.img}/>

      <div>

        <h1>{house.location}</h1>
        <p>{house.description}</p>
        <h2>{house.owner}</h2>
        {house.owner !== getLoggedInUserName() && <button onClick={addComment}>
          Make request
        </button>}
        {house.owner === getLoggedInUserName() &&
          <button onClick={deleteHouse}>
            Dealete house
          </button>
        }

      </div>

      {Object.keys(conversations).map((conversationId) => (
        conversationId === openConversation ? (
          <div key={conversationId} className={styles.commentsDiv} >
            {conversations[conversationId].map((comment, index) => (
              <div key={index}>
                <Comments comment={comment} house={house}></Comments>
              </div>
            ))}
            <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} />

            <button className={styles.button} onClick={() => reply(conversationId, message)}>Send message</button>
          </div>

        ) : (
          <button className={styles.button} onClick={() => setOpenConversation(conversationId)}>{conversationId}</button>
        )


      ))}



    </div>
  )
}

export default House