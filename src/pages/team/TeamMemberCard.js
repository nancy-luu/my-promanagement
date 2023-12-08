import { useUsersProjects } from "../../hooks/useUsersProjects";
import { Link } from "react-router-dom";

// components
import Avatar from "../../components/Avatar";
import HorizontalBarChart from "./HorizontalBarChart";

// styles
import "./Team.css";

const TeamMemberCard = ({ user }) => {
  const { projectCount, openProjects, inProgressProjects,  completedProjects } =
    useUsersProjects(user);

  return (
    <Link to={`/team/user/${user.id}`}>
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
            <HorizontalBarChart user={user} />
        </div>
    </Link>
  );
};

export default TeamMemberCard;
