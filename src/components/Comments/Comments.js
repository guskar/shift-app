
import { getLoggedInUserName } from "../../utils/auth"
import styles from './style.module.css'


const Comments = ({ comment, color }) => {
 
  
  return (
    <div style={{backgroundColor: color}} className={styles.commentDiv}> 
    
       <h4>{comment.username === getLoggedInUserName() ? 'You' : comment.username}</h4>
       <h5>{comment.comment}</h5>
     
    </div>
  )
}

export default Comments