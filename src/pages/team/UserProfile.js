import { useParams } from "react-router-dom";
import { useDocument } from "../../hooks/useDocument";
import { useCollection } from "../../hooks/useCollection";
import { useUsersProjects } from "../../hooks/useUsersProjects";


// components
import Avatar from "../../components/Avatar";
import HorizontalBarChart from "./HorizontalBarChart";

const UserProfile = () => {
  const { id } = useParams();
  const { error: userError, document: user } = useDocument("users", id);
  const { error: projectError, documents: projects } = useCollection("projects");
  const { projectCount, openProjects, inProgressProjects,  completedProjects } =
    useUsersProjects(user);
  
  console.log(user)

  const usersProjects = projects ? projects.filter(projectDoc =>
    projectDoc.assignedUsersList.some(userObj => userObj.id === id)
    ) 
    : 
    []
  ;

  if (userError) {
    return <div className="error">{userError}</div>;
  }
  if (!user) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div>
      {user && (
        <div className="user-profile-card">
          <Avatar src={user.photoURL} />
          <h2>{user.displayName}</h2>
          <h4>{user.department.label} | {user.role}</h4>
          <p>{projectCount}</p>
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
          <HorizontalBarChart user={user}/>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
