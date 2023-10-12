import { useAuthContext } from '../../hooks/useAuthContext'
import { useMyProjects } from "../../hooks/useMyProjects";
import Avatar from "../../components/Avatar"



const NewComment = ({ comment }) => {
    const { user } = useAuthContext(); // to get current user 
    const { myProjects } = useMyProjects();

    const commentProject = myProjects.find(project =>
        project.comments.some(commentItem => commentItem.id === comment.id)
      );



  return (
    <>
        {comment.photoURL !== user.photoURL && (
            <div className="comment-form">
                <Avatar src={comment.photoURL} /> 
                <div className="comment-info">
                    <div className="comment-createdBy">
                        {comment.displayName} from {commentProject && <>{commentProject.name}</>}
                    </div>
                    <div className="comment-content">
                        {comment.content}
                    </div>
                </div>
            </div>
        )}
    </>
  )
}

export default NewComment
