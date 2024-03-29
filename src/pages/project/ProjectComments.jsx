import { useState } from 'react'
import { timestamp } from '../../firebase/config'
import { useAuthContext } from '../../hooks/useAuthContext'
import { useFirestore } from "../../hooks/useFirestore"
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

// components
import Avatar from '../../components/Avatar'

export default function ProjectComments({ project }) {
    const { user } = useAuthContext()
    const { updateDocumentComments, response } = useFirestore('projects')
    const [newComment, setNewComment] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()

        const commentToAdd = {
            displayName: user.displayName,
            photoURL : user.photoURL,
            content: newComment,
            createdAt: timestamp.fromDate(new Date()),
            id: Math.random()
        }

        await updateDocumentComments(project.id, {
            comments: [...project.comments, commentToAdd]
        })

        if(!response.error){
            setNewComment('')
        }
    }

    const currUserIsAssigned = project.assignedUsersList.filter((assignedUser) => assignedUser.id === user.uid)

  return (
    <div className="project-comments-wrapper">
        <div className="project-comments">
            <h4>Project Updates:</h4>
            {project.comments.length > 0 ? 
                <ul>
                    {project.comments.length > 0 && project.comments.map((comment) => (
                        <div key={comment.id} className="project-comment">
                            <div className="comment-author">
                                <span className="avatar-wrapper">
                                    <Avatar src={comment.photoURL}/>
                                </span>
                                <div className="comment-details">
                                    <div className="author-details">
                                        <h4>{comment.displayName}</h4>
                                        <p>{formatDistanceToNow(comment.createdAt.toDate(), { addSuffix: true })}</p>
                                    </div>
                                    <div className="comment">
                                        <p>{comment.content}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </ul>
                :
                <>
                    { currUserIsAssigned.length > 0 ? 
                        <></>
                        :
                        <p>(No updates to display)</p>
                    }
                </>
            }
        { 
            currUserIsAssigned.length > 0 ? 
                <form className="add-comment" onSubmit={handleSubmit}>
                    <label>
                        <textarea
                            required
                            className="custom-textarea"
                            placeholder='Add a comment...'
                            onChange={(e) => setNewComment(e.target.value)}
                            value={newComment}
                        ></textarea>
                    </label>
                    <button className="btn">Add</button>
                </form>
            :
            <></>
        }
        </div>
    </div>
  )
}
