import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { getAccessToken, getLoggedInUserName } from '../../utils/auth'



const House = () => {
  
  const [house, setHouse] = useState([])
  const [conversations, setConversations] = useState({})

  const {
    id
  } = useParams('/houses/:id')

  const addComment = async () => {
    const commentBody = {
      conversationId: getLoggedInUserName(),
      comment: `${getLoggedInUserName()} wants to make a request`
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
        const json = await response.json()



        const _conversations = {}

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
    <div >
      
      <div>
       
        <img src={house.imageUrl} alt='' />
        <p>{house.location}</p>
        <p>{house.description}</p>
        <p>{house.owner}</p>
        {house.owner !== getLoggedInUserName() &&  <button onClick={addComment}>
           Make request
          </button>}
       

      </div>
      
      {Object.keys(conversations).map((conversationId) => (
        <div key={conversationId}>
          {conversations[conversationId].map((comment, index) => (
            <div key={index}>
              <div>
                {comment.username}
              </div>
              <div>
                {comment.comment}
              </div>
            </div>
          ))}
          <input id={conversationId + '_replytext'} type="text" />
          <button onClick={() => {
            const replyText = document.getElementById(conversationId + '_replytext').value
            reply(conversationId, replyText)
          }}>Reply</button>
        </div>
      ))}
    </div>
  )
}

export default House