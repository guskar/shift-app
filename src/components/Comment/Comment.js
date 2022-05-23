import React from 'react'
import { getLoggedInUserName } from '../../utils/auth'
import styles from './style.module.css'
/**
 * A react comments component.
 *
 * @type {object} Props.
 * @returns {React.ReactElement} Comments.
 */
const Comments = ({ comment, color }) => {
  return (
    <div style={{ backgroundColor: color }} className={styles.commentDiv}>
       <h4>{comment.username === getLoggedInUserName() ? 'You' : comment.username}</h4>
       <h5>{comment.comment}</h5>
    </div>
  )
}

export default Comments
