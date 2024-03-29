import { Link } from "react-router-dom";
import { tableImgs } from "../../util/images";

// components
import Avatar from "../../components/Avatar"; 

// styles and images
import "./Team.css";

const UserInfoCell = ({ user, uniqueTeamMembersObject, projectDocuments, collaboratorIds }) => {

  const myProjects = projectDocuments
    ? projectDocuments.filter((projectDoc) =>
        projectDoc.assignedUsersList.some(
          (userObj) => userObj.displayName === user.displayName
        )
      )
    : [];
  const projectCount = myProjects.length;

  /**
   *  Note: Why so many links below?
   *  Currently the Links must wrap every td so that they can align with the th tags in TeamDash.
   *  Using a single Link tag to wrap the tr element below or around the UserInfo component in TeamDash will cause misalignment.
   *  This will be refactored.
   */

  return (
    <tr className="user-info">
      <td className="user-name">
        <Link to={`/team/user/${user.id}`}>
          <div className="user-name-wrapper">
            <Avatar src={user.photoURL} />
            <span className="user-name-text">{user.displayName}</span>
          </div>
        </Link>
      </td>
      <td className="user-status">
        <Link to={`/team/user/${user.id}`}>
            {user.online ? (
              <div className="active">• Active</div>
            ) : (
              <div className="offline">• Offline</div>
            )}
        </Link>
      </td>
        <td className="user-role">
          <Link to={`/team/user/${user.id}`}>
              <p>{user.role}</p>
          </Link>
        </td>
        <td className="user-department">
          <Link to={`/team/user/${user.id}`}>
              <p>{user.department.label}</p>
          </Link>
        </td>
      <td className="user-project">
        <Link to={`/team/user/${user.id}`}>
            <p>{projectCount ? projectCount : "-"}</p>
        </Link>
      </td>
      <td className="user-check">
        <Link to={`/team/user/${user.id}`}>
            <div className="check-wrapper">
              {collaboratorIds.includes(user.id) ? (
                <img src={tableImgs.check} alt="check-icon" />
              ) : (
                <div></div>
              )}
            </div>
        </Link>
      </td>
    </tr>
  );
};

export default UserInfoCell;
