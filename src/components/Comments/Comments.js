

const Comments = ({ comment, house }) => {
  
  return (
    <div >
      <div>
        {comment.username}
      </div>
      <div>
        {comment.comment}
      </div>
    </div>
  )
}

export default Comments