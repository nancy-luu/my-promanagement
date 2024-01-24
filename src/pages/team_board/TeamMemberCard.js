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
    <div className="team-member-card-wrapper">
        <Link to={`/team/user/${user.id}`}>
            <div className="user-list-item">
                <div className="team-member-detail">
                    <div>
                        <Avatar src={user.photoURL} />
                    </div>
                    <div className="team-member-name-role">
                    {user.online && <div className="online-dot"></div>}
                        <h3>{user.displayName}</h3>
                        <p>{user.role}</p>
                    </div>
                </div>
                <div className="project-breakdown">
                    <p>{projectCount} Total Projects: </p>
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
    </div>
  );
};

export default TeamMemberCard;
