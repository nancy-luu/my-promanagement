import { Link } from "react-router-dom";
import { statusHelper } from '../../util/statusHelper';

// components
import Avatar from "../../components/Avatar";

// styles 
import "./ProjectsDash.css";
 
export default function ProjectInfo ({ project }) {

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
                <div className={statusHelper(project)}>• {statusHelper(project)}</div>
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
