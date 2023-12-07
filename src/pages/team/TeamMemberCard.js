import { useUsersProjects } from "../../hooks/useUsersProjects";

// components
import Avatar from "../../components/Avatar";

// styles
import "./Team.css";
import HorizontalBarChart from "./HorizontalBarChart";

const TeamMemberCard = ({ user }) => {
  const { projectCount, openPercent, inProgressPercent, completedPercent } =
    useUsersProjects(user);

    const barChartData = [
        { label: 'Open', percentage: openPercent, color: '#FFEE53' },
        { label: 'In Progress', percentage: inProgressPercent, color: '#FF6525' },
        { label: 'Completed', percentage: completedPercent, color: '#7521FF' },
    ];

  return (
    <div className="user-list-item">
      <Avatar src={user.photoURL} />
      {user.online && <div className="online-dot"></div>}
      <h3>{user.displayName}</h3>
      <p>{user.role}</p>
      <p>Projects Stats:</p>
      <p>{projectCount}</p>
      <HorizontalBarChart data={barChartData} />
    </div>
  );
};

export default TeamMemberCard;
