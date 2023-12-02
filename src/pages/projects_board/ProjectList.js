import { Link } from "react-router-dom";

// components
import Avatar from "../../components/Avatar";

// styles
import "./Projects.css";

export default function ProjectList({ projects }) {
  const openProjects = projects.filter((p) => !p.isCompleted);

  return (
    <div className="project-list-body">
      <div className="open-projects-container">
        {openProjects.map((project) => (
          <Link to={`/projects/${project.id}`} key={project.id}>
            <h4>{project.name}</h4>
            {/* dueDate is a firestore date object that must be converted */}
            <p>Due by {project.dueDate.toDate().toDateString()}</p>
            <div className="assigned-to">
              <ul>
                {project.assignedUsersList.map((user) => (
                  <li key={user.photoUrl}>
                    <Avatar src={user.photoURL} />
                  </li>
                ))}
              </ul>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
