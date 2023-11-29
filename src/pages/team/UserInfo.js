import { useCollection } from "../../hooks/useCollection";
import { Link } from "react-router-dom";

// components
import Avatar from "../../components/Avatar";

// styles and images
import "./Team.css";
import Check from "../../assets/check.png";

const UserInfo = ({ user, uniqueTeamMembersObject }) => {
  const { documents: projectDocuments } = useCollection("projects");

  const myProjects = projectDocuments
    ? projectDocuments.filter((projectDoc) =>
        projectDoc.assignedUsersList.some(
          (userObj) => userObj.displayName === user.displayName
        )
      )
    : [];
  const projectCount = myProjects.length;

  const collaboratorIds = uniqueTeamMembersObject.map((tm) => tm.id);

  /**
   *  Why so many Links below?
   *  Currently the Links must wrap every td so that they can align with the th tags in TeamDash.
   *  Using a single Link tag to wrap the tr element below or around the UserInfo component in TeamDash will cause misalignment.
   */

  return (
    <tr className="user-info">
      <td className="user-name">
        <Link to={`/team/${user.id}`}>
          <div className="user-name-wrapper">
            <Avatar src={user.photoURL} />
            <span className="user-name-text">{user.displayName}</span>
          </div>
        </Link>
      </td>
      <td>
        <Link to={`/team/${user.id}`}>
          {user.online ? (
            <div className="active">• Active</div>
          ) : (
            <div className="offline">• Offline</div>
          )}
        </Link>
      </td>
      <td>
        <Link to={`/team/${user.id}`}>{user.role}</Link>
      </td>
      <td>
        <Link to={`/team/${user.id}`}>{user.department.label}</Link>
      </td>
      <td>
        <Link to={`/team/${user.id}`}>{projectCount ? projectCount : "-"}</Link>
      </td>
      <td className="check-icon">
        <Link to={`/team/${user.id}`}>
          <div className="check-wrapper">
            {collaboratorIds.includes(user.id) ? (
              <img src={Check} alt="check-icon" />
            ) : (
              <div></div>
            )}
          </div>
        </Link>
      </td>
    </tr>
  );
};

export default UserInfo;
