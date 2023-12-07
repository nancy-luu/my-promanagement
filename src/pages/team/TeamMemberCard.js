import { useUsersProjects } from "../../hooks/useUsersProjects";

// components
import Avatar from "../../components/Avatar";

// styles
import "./Team.css";
import HorizontalBarChart from "./HorizontalBarChart";

const TeamMemberCard = ({ user }) => {
  const { projectCount, openPercent, inProgressPercent, completedPercent, openProjects, inProgressProjects,  completedProjects} =
    useUsersProjects(user);

    const barChartData = [
        { label: 'Open', percentage: openPercent, color: '#FFEE53' },
        { label: 'In Progress', percentage: inProgressPercent, color: '#FF6525' },
        { label: 'Completed', percentage: completedPercent, color: '#7521FF' },
    ];

    console.log("COMPLETED")
    console.log(completedPercent)
    console.log(completedProjects)

  return (
    <div className="user-list-item">
      <Avatar src={user.photoURL} />
      {user.online && <div className="online-dot"></div>}
      <h3>{user.displayName}</h3>
      <p>{user.role}</p>
      <p>{projectCount} Total Projects: </p>
      <div className="project-breakdown">
        {openProjects.length ?
            <div className="stat-label">                
                <div className="open-pt"></div>
                {openProjects.length} Open
            </div> : <></>
        }
        {inProgressProjects.length ?  
            <div className="stat-label">
                <div className="progress-pt"></div>
                <p>{inProgressProjects.length} In Progress</p> 
            </div> : <></>
        }
        {completedProjects.length ?
            <div className="stat-label">
                <div className="complete-pt"></div>
                <p>{completedProjects.length} Completed</p> 
            </div> : <></>
        }
      </div>
      <div className="stats-details">
      </div>
      <HorizontalBarChart data={barChartData} />
    </div>
  );
};

export default TeamMemberCard;
