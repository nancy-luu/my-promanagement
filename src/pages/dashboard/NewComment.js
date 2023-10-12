import { useAuthContext } from '../../hooks/useAuthContext'
import Avatar from "../../components/Avatar"



const NewComment = ({ comment }) => {
    const { user } = useAuthContext(); // to get current user 

  return (
    <>
        {comment.photoURL !== user.photoURL && (
            <div className="comment-form">
                <Avatar src={comment.photoURL} /> 
                <div className="comment-createdBy">
                    {comment.displayName}
                </div>
                <div className="comment-content">
                    {comment.content}
                </div>
            </div>
        )}
    </>
  )
}

export default NewComment
