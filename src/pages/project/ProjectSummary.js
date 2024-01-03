import { useFirestore } from "../../hooks/useFirestore";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useHistory } from "react-router-dom";
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import { statusHelper } from '../../util/statusHelper';


// components
import Avatar from "../../components/Avatar";
import UpdateModal from "../../components/UpdateModal";
import DeleteModal from "../../components/DeleteModal";

//styles
import './Project.css';

export default function ProjectSummary({ project }) {
  const { markAsCompleted } = useFirestore("projects");
  const { user } = useAuthContext(); // to get current user
  const history = useHistory();

  const handleComplete = (e) => {
    markAsCompleted(project.id);
    history.push("/projects"); // sending to main page once deleted
  };

  return (
      <div className="project-summary">
        <div className="title-section">
          <h3>{project.name}</h3>
          <p>Added by {project.createdBy.displayName} {formatDistanceToNow(project.createdAt.toDate(), { addSuffix: true })}</p>
        </div>
        <div className="project-breakdown">
          <div className="due-date-section">
            <h4>Due On</h4>
            <p>{project.dueDate.toDate().toDateString()}</p>
          </div>
          <div className="category-section">
            <h4>Category</h4>
            <div className="project-category">
              {[...project.category][0].toUpperCase() +
                [...project.category].slice(1).join("")}
            </div>
          </div>
          <div className="status-section">
            <h4>Status</h4>
            <div className={statusHelper(project)}>• {statusHelper(project)}</div>
          </div>
        </div>
        <div className="assigned-users">
          <h4>Assigned to:</h4>
          <div className="users-avatars">
            {project.assignedUsersList.map((user) => (
              <div key={user.id}>
                <Avatar src={user.photoURL} />
              </div>
            ))}
          </div>
        </div>
        <div className="description-section">
        <h4>Description:</h4>
        <p className="details">{project.details}</p>
          <div className="project-buttons">
            {!project.isCompleted && (
              <>
                {user.uid === project.createdBy.id && (
                  <>
                    <UpdateModal project={project} />
                  </>
                )}
                {project.assignedUsersList.some(
                  (assignedUser) => assignedUser.id === user.uid
                ) && (
                  <button className="btn" onClick={handleComplete}>
                    Complete
                  </button>
                )}
                {user.uid === project.createdBy.id && (
                  <>
                    <DeleteModal project={project} />
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </div>
  );
}
