import React, { useState } from 'react'
import { getAccessToken, getLoggedInUserName } from '../../utils/auth'
import styles from './style.module.css'
import Comment from '../../components/Comment/Comment'

/**
 * A route for rendering the house page.
 *
 * @type {object} props
 * @returns {React.ReactElement} The housepage.
 */
const Comments = ({ id, conversations, house }) => {
  const [openConversation, setOpenConversation] = useState()
  const [message, setMessage] = useState('')

  /**
   * Makes a post request to resource api for adding a reply to a comment.
   *
   * @param {string} conversationId The current conversation id.
   * @param {object} comment The current comment.
   */
  const reply = async (conversationId, comment) => {
    const commentBody = {
      conversationId,
      comment
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
    setMessage('')
  }

  return (
    Object.keys(conversations).map((conversationId) => (
      conversationId === openConversation
        ? (
        <div key={conversationId} className={styles.commentsDiv} >
          {conversations[conversationId].map((comment, index) => (
            <div key={index}>
              {comment.username === getLoggedInUserName() ? <Comment color='#609e71' comment={comment} house={house}></Comment> : <Comments color='#389674' comment={comment} house={house}></Comments>}
            </div>
          ))}
          <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} />
          <button onClick={() => reply(conversationId, message)}>Send message</button>
          <button onClick={() => setOpenConversation('')}>Close conversation</button>
        </div>
          )
        : (
        <div key={conversationId} className={styles.commentsDiv}>
          <button onClick={() => setOpenConversation(conversationId)}>{conversationId}</button>
        </div>
          )
    ))
  )
}

export default Comments
