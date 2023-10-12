import { useAuthContext } from '../../hooks/useAuthContext'
import { useMyProjects } from "../../hooks/useMyProjects";
import Avatar from "../../components/Avatar"

import ArrowIcon from "../../assets/arrowright.png";



const NewComment = ({ comment }) => {
    const { user } = useAuthContext(); // to get current user 
    const { myProjects } = useMyProjects();

    const commentProject = myProjects.find(project =>
        project.comments.some(commentItem => commentItem.id === comment.id)
      );

    const commentPreview = [...comment.content].slice(0, 30);


  return (
    <>
        {comment.photoURL !== user.photoURL && (
            <div className="comment-form">
                <div className="comment-avatar">
                    <Avatar src={comment.photoURL} /> 
                </div>
                <div className="comment-info">
                    <div className="comment-createdBy">
                        {comment.displayName} - {commentProject && <>{commentProject.name}</>}
                    </div>
                    <div className="comment-content">
                        {commentPreview}...
                    </div>
                </div>
                <div className="comment-arrow">
                    <img className="arrow" src={ArrowIcon} alt="arrow icon" />
                </div>
            </div>
        )}
    </>
  )
}

export default NewComment
