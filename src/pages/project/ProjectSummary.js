import { useFirestore } from "../../hooks/useFirestore";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useHistory } from "react-router-dom";

// components
import Avatar from "../../components/Avatar";
import DeleteModal from "../../components/DeleteModal";
import UpdateModal from "../../components/UpdateModal";

export default function ProjectSummary({ project }) {
  const { markAsCompleted } = useFirestore("projects");
  const { user } = useAuthContext(); // to get current user
  const history = useHistory();

  const handleComplete = (e) => {
    markAsCompleted(project.id);
    history.push("/projects"); // sending to main page once deleted
  };

  function getStatusText(project) {
    if (project.isCompleted === true) {
      return "Complete";
    } else if (project.comments.length > 0 && project.isCompleted === false) {
      return "In Progress";
    } else if (project.isCompleted === false) {
      return "Open";
    } else {
      return "Unknown";
    }
  }

  return (
    <div>
      <div className="project-summary">
        <h2 className="page-title">{project.name}</h2>
        <p>
          Category:{" "}
          {[...project.category][0].toUpperCase() +
            [...project.category].slice(1).join("")}
        </p>
        <p>Owner: {project.createdBy.displayName}</p>
        <p>Status: {getStatusText(project)}</p>
        <p className="due-date">
          Project due by {project.dueDate.toDate().toDateString()}
        </p>
        <p className="details">{project.details}</p>
        <h4>Project is assigned to:</h4>
        <div className="assigned-users">
          {project.assignedUsersList.map((user) => (
            <div key={user.id}>
              <Avatar src={user.photoURL} />
            </div>
          ))}
        </div>
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
  );
}
