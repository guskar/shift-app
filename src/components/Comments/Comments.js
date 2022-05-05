
import { getLoggedInUserName } from "../../utils/auth"


const Comments = ({ comment }) => {
 
  
  return (
    <div>
      <div>
        {comment.username === getLoggedInUserName() ? 'you' : comment.username}
      </div>
      <div>
        {comment.comment}
      </div>
    </div>
  )
}

export default Comments