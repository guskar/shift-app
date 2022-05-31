import React, { useState } from 'react'
import { getLoggedInUserName } from '../../utils/auth'
import { backendFetch } from '../../utils/utils'
import styles from './style.module.css'
import Comment from '../../components/Comment/Comment'
import FlashMessage from '../FlashMessage/FlashMessage'
import { RiMailSendLine } from 'react-icons/ri'
import { AiOutlineCloseCircle } from 'react-icons/ai'

/**
 * A route for rendering the house page.
 *
 * @type {object} props
 * @returns {React.ReactElement} The housepage.
 */
const Comments = ({ id, conversations, house, refetch }) => {
  const [openConversation, setOpenConversation] = useState()
  const [message, setMessage] = useState('')
  const [sendMessageFailed, setSendMessageFailed] = useState(false)

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
    const response = await backendFetch(`houses/${id}/comment`, 'POST', commentBody)
    if (response.status === 201) {
      setMessage('')
    } else {
      setSendMessageFailed(true)
    }

    await refetch()
  }

  return (
    Object.keys(conversations).map((conversationId) => (
      conversationId === openConversation
        ? (
        <div key={conversationId} className={styles.commentsDiv} >
          {conversations[conversationId].map((comment, index) => (
            <div key={index}>
              {comment.username === getLoggedInUserName() ? <Comment color='#609e71' comment={comment} house={house}></Comment> : <Comment color='#497069' comment={comment} house={house}></Comment>}
            </div>
          ))}
          <textarea rows='10' value={message} onChange={(e) => setMessage(e.target.value)} required></textarea>
          <button onClick={() => reply(conversationId, message)}><RiMailSendLine className={styles.sendIcon}></RiMailSendLine></button>
          <button onClick={() => setOpenConversation('')}><AiOutlineCloseCircle className={styles.sendIcon}></AiOutlineCloseCircle></button>
        </div>
          )
        : (
        <div key={conversationId} className={styles.commentsDiv}>
          <button onClick={() => setOpenConversation(conversationId)}>{conversationId}</button>
          {sendMessageFailed && <FlashMessage message={'Something went wrong trying to comment on this house.'} show={true}></FlashMessage>}
        </div>
          )
    ))
  )
}

export default Comments
