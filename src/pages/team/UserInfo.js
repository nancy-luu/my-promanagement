// components
import Avatar from "../../components/Avatar";

// styles and images
import './Team.css'
import Check from "../../assets/check.png";


const UserInfo = ({ user, uniqueTeamMembersObject }) => {

  const collaboratorIds = uniqueTeamMembersObject.map((tm) => tm.id)
  console.log(collaboratorIds)

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
      <td>5</td>
      <td className="check-icon">
        <div className="check-wrapper">
          {collaboratorIds.includes(user.id) ? <img src={Check} alt="check-icon" /> : <div></div>}
        </div>
      </td>
    </tr>
  );
};

export default UserInfo;
