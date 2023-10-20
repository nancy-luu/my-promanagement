import { useFirestore } from '../../hooks/useFirestore'
import { useAuthContext } from '../../hooks/useAuthContext'
import { useHistory } from 'react-router-dom'

// components
import Avatar from "../../components/Avatar"

export default function ProjectSummary({ project }) {
    const { markAsCompleted } = useFirestore('projects');
    const { user } = useAuthContext(); // to get current user 
    const history = useHistory();

    const handleClick = (e) => {
        markAsCompleted(project.id);
        history.push('/') // sending to main page once deleted
    }

    function getStatusText(project) {
        if (project.isCompleted === true) {
          return 'Complete';
        } else if (project.comments.length > 0 && project.isCompleted === false) {
          return 'In Progress';
        } else if (project.isCompleted === false) {
          return 'Open';
        } else {
          return 'Unknown';
        }
    }
      

  return (
    <div>
        <div className="project-summary">
            <h2 className="page-title">{project.name}</h2>
            <p>Owner: {project.createdBy.displayName}</p>
            <p>Status: {getStatusText(project)}</p>
            <p className="due-date">
                Project due by {project.dueDate.toDate().toDateString()}
            </p>
            <p className="details">
                {project.details}
            </p>
            <h4>Project is assigned to:</h4>
            <div className="assigned-users">
                {project.assignedUsersList.map((user) => (
                    <div key={user.id}>
                        <Avatar src={user.photoURL} />
                    </div>
                ))}
            </div>
        </div>
        {user.uid === project.createdBy.id && (
            <button className="btn" onClick={handleClick}>Complete</button>
        )}
    </div>
  )
}
