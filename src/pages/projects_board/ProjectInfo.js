import { Link } from "react-router-dom";

// components
import Avatar from "../../components/Avatar";

// styles
import "./Projects.css";

export default function ProjectInfo ({ project }) {

  const projectStat = (p) => {
    let status;
    if(!p.isCompleted && p.comments.length === 0) {
      status = "• Open";
    } else if (p.comments && p.comments.length > 0) {
      status = "• In Progress"
    } else if (project.isCompleted){
      status = "• Complete"
    } else {
      status = "Unknown"
    }
    return status;
  }

  console.log(project.id)

  return (
    <tr className="project-info">
      <td className="project-name">
          <Link to={`/projects/${project.id}`}>
            <div className="project-name-wrapper">  
                <span className="project-name-text">{project.name}</span>
            </div>
          </Link>
      </td>
      <td className="project-status">
          <Link to={`/projects/${project.id}`}>
                <div className={projectStat(project)}>{projectStat(project)}</div>
          </Link>
      </td>
      <td className="project-due">
          <Link to={`/projects/${project.id}`}>
            <div className="project-due-wrapper">
                <span className="project-due-text">{project.dueDate.toDate().toDateString()}</span>
            </div>
          </Link>
      </td>
      <td className="project-owner">
          <Link to={`/projects/${project.id}`}>
            <div className="project-owner-wrapper">
                <Avatar src={project.createdBy.photoURL} />
                <span className="project-owner-text">{project.createdBy.displayName}</span>
            </div>
          </Link>
      </td>
      <td className="project-team">
          <Link to={`/projects/${project.id}`}>
            <div className="project-team-wrapper">  
                {project.assignedUsersList.map((user) => (
                  <div className="team-member-icon" key={user.photoUrl}>
                    <Avatar src={user.photoURL} />
                  </div>
                ))}
            </div>
          </Link>
      </td>
      <td className="project-department">
          <Link to={`/projects/${project.id}`}>
            <p>{[...project.category][0].toUpperCase()+[...project.category].slice(1).join('')}</p>
          </Link>
      </td>
    </tr>
  );
}
