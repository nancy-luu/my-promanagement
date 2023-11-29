import { useCollection } from '../../hooks/useCollection'

// components
import Avatar from "../../components/Avatar";

// styles and images
import './Team.css'
import Check from "../../assets/check.png";


const UserInfo = ({ user, uniqueTeamMembersObject }) => {
  const { documents: projectDocuments } = useCollection('projects');

  const myProjects = projectDocuments ? projectDocuments.filter(projectDoc =>
    projectDoc.assignedUsersList.some(userObj => userObj.displayName === user.displayName)
    ) 
    : 
    []
  ;

  const projectCount = myProjects.length;

  const collaboratorIds = uniqueTeamMembersObject.map((tm) => tm.id)

  return (
    <tr className="user-info">
      <td className="user-name">
        <div className="user-name-wrapper">
          <Avatar src={user.photoURL} />
          <span className="user-name-text">{user.displayName}</span>
        </div>
      </td>
      <td>
        {user.online ? (
          <div className="active">• Active</div>
        ) : (
          <div className="offline">• Offline</div>
        )}
      </td>
      <td>{user.role}</td>
      <td>{user.department.label}</td>
      <td>{projectCount? projectCount : "-"}</td>
      <td className="check-icon">
        <div className="check-wrapper">
          {collaboratorIds.includes(user.id) ? <img src={Check} alt="check-icon" /> : <div></div>}
        </div>
      </td>
    </tr>
  );
};

export default UserInfo;
