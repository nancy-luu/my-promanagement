import { useUsersProjects } from "../../hooks/useUsersProjects";

// components
import Avatar from "../../components/Avatar";

// styles
import "./Team.css";

const TeamMemberCard = ({ user }) => {
  const { projectCount, openPercent, inProgressPercent, completedPercent } =
    useUsersProjects(user);

  return (
    <div className="user-list-item">
      <Avatar src={user.photoURL} />
      {user.online && <div className="online-dot"></div>}
      <h3>{user.displayName}</h3>
      <p>{user.role}</p>
      <p>Projects Stats:</p>
      <p>{projectCount}</p>
      <div className="progress-bar-container">
      <div
          className="progress-stat-bar open"
          style={{ width: `${openPercent}%` }}
        ></div>
        <div
          className="progress-stat-bar in-progress"
          style={{ width: `${inProgressPercent}%` }}
        ></div>
        <div
          className="progress-stat-bar completed"
          style={{ width: `${completedPercent}%` }}
        ></div>
      </div>
    </div>
  );
};

export default TeamMemberCard;
