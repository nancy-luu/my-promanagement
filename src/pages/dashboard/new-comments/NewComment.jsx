import { useAuthContext } from '../../../hooks/useAuthContext'

// components
import Avatar from "../../../components/Avatar"

const NewComment = ({ comment, projects }) => {
    const { user } = useAuthContext(); // to get current user 

    const commentProject = projects.find(project =>
        project.comments.some(commentItem => commentItem.id === comment.id)
      );

    let commentNamePreview;
    if(commentProject && commentProject.name){
        if(commentProject.name.length > 30){
            commentNamePreview = [...commentProject.name].slice(0, 30).join("") + "..."
        } else {
            commentNamePreview = commentProject.name;
        }
    }
 
    const commentPreview = [...comment.content].slice(0, 40);
 
    console.log("COMMENT INSIDE")
    console.log(commentProject)
 
  return (
    <>
        {comment.photoURL !== user.photoURL && (
            <div className="comment-form inner-common">
                <div className="comment-avatar">
                    <Avatar src={comment.photoURL} /> 
                </div>
                <div className="comment-info">
                    <p>
                        {comment.displayName} - {commentProject && <>{commentNamePreview}</>}
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
