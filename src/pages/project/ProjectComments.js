import { useState } from 'react'
import { timestamp } from '../../firebase/config'
import { useAuthContext } from '../../hooks/useAuthContext'
import { useFirestore } from "../../hooks/useFirestore"

export default function ProjectComments({ project }) {
    const { user } = useAuthContext()
    const { updateDocument, response } = useFirestore('projects')
    const [newComment, setNewComment] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()

        // update object that will be added to the spread comments array in updateDocument
        const commentToAdd = {
            displayName: user.displayName,
            photoURL : user.photoURL,
            content: newComment,
            createdAt: timestamp.fromDate(new Date()),
            id: Math.random()
        }

        await updateDocument(project.id, {
            comments: [...project.comments, commentToAdd]
        })

        if(!response.error){
            setNewComment('') // updating the text area to be empty string 
        }
    }

  return (
    <div className="project-comments">
      <h4>Project Comments</h4>
      <form className="add-comment" onSubmit={handleSubmit}>
        <label>
            <textarea
                required
                placeholder='Add an update...'
                onChange={(e) => setNewComment(e.target.value)}
                value={newComment}
            ></textarea>
        </label>
        <button className="btn">Add Comment</button>
      </form>
    </div>
  )
}
