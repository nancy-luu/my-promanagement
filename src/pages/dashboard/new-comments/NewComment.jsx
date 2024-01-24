import { useAuthContext } from '../../../hooks/useAuthContext'
import { useMyProjects } from "../../../hooks/useMyProjects";

// components
import Avatar from "../../../components/Avatar"

const NewComment = ({ comment }) => {
    const { user } = useAuthContext(); // to get current user 
    const { myProjects } = useMyProjects();

    const commentProject = myProjects.find(project =>
        project.comments.some(commentItem => commentItem.id === comment.id)
      );

    const commentPreview = [...comment.content].slice(0, 40);
 

  return (
    <>
        {comment.photoURL !== user.photoURL && (
            <div className="comment-form inner-common">
                <div className="comment-avatar">
                    <Avatar src={comment.photoURL} /> 
                </div>
                <div className="comment-info">
                    <p>
                        {comment.displayName} - {commentProject && <>{commentProject.name}</>}
                    </p>
                    <div className="comment-content">
                        "{commentPreview}..."
                    </div>
                </div>
            </div>
        )}
    </>
  )
}

export default NewComment
