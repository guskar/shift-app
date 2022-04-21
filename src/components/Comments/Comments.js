import styles from './style.module.css'

const Comments = ({ comment, house }) => {
  
  return (
    <div >
      <div>
        {comment.username === house.owner ? 'You' : comment.username}
      </div>
      <div>
        {comment.comment}
      </div>
    </div>
  )
}

export default Comments