import React, { useState } from 'react'
import { getLoggedInUserName } from '../../utils/auth'
import { backendFetch } from '../../utils/utils'
import styles from './style.module.css'
import Comment from '../../components/Comment/Comment'

/**
 * A route for rendering the house page.
 *
 * @type {object} props
 * @returns {React.ReactElement} The housepage.
 */
const Comments = ({ id, conversations, house, refetch }) => {
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
    await backendFetch(`houses/${id}/comment`, 'POST', commentBody)
    setMessage('')
    await refetch()
  }

  return (
    Object.keys(conversations).map((conversationId) => (
      conversationId === openConversation
        ? (
        <div key={conversationId} className={styles.commentsDiv} >
          {conversations[conversationId].map((comment, index) => (
            <div key={index}>
              {comment.username === getLoggedInUserName() ? <Comment color='#609e71' comment={comment} house={house}></Comment> : <Comment color='#389674' comment={comment} house={house}></Comment>}
            </div>
          ))}
          <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} />
          <button onClick={() => reply(conversationId, message)}>Send message</button>
          <button onClick={() => setOpenConversation('')}>Close</button>
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
