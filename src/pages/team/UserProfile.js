import { useState, useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import { useDocument } from "../../hooks/useDocument";
import { useCollection } from "../../hooks/useCollection";
import { useUsersProjects } from "../../hooks/useUsersProjects";


// components
import Avatar from "../../components/Avatar";
import HorizontalBarChart from "../team_board/HorizontalBarChart";
import ProjectInfo from "../projects_board/ProjectInfo";

// style and images
import SortIcon from "../../assets/sort-icon.png"


const UserProfile = () => {
  const { id } = useParams();
  const { error: userError, document: user } = useDocument("users", id);
  const { error, documents: projects } = useCollection("projects");
  const { projectCount, openProjects, inProgressProjects,  completedProjects } = useUsersProjects(user);
  
  const [sortedProjectDocs, setSortedProjectDocs] = useState([])
  const [sortNamesAsc, setSortNamesAsc] = useState(false);

  const usersProjects = useMemo(() => {
    return projects ? projects.filter(projectDoc =>
      projectDoc.assignedUsersList.some(userObj => userObj.id === id)
      ) : [];
    }, [projects, id]);


  useEffect(() => {
    setSortedProjectDocs(usersProjects);
  }, [usersProjects])

  if (userError) {
    return <div className="error">{userError}</div>;
  }
  if (!user) {
    return <div className="loading">Loading...</div>;
  }

  const handleProjectNameSort = () => {
    if(!sortNamesAsc){
      const sortedProjectNamesAsc = [...sortedProjectDocs].sort((a, b) => {
        if(a.name < b.name) {
          return -1;
        }
        if(a.name > b.name) {
          return 1;
        }
        return 0;
      })
      setSortedProjectDocs(sortedProjectNamesAsc);
      setSortNamesAsc(true);
    } else {
      const sortedProjectNamesDsc = [...sortedProjectDocs].sort((a, b) => {
        if(a.name > b.name) {
          return -1;
        }
        if(a.name < b.name) {
          return 1;
        }
        return 0;
      })
      setSortedProjectDocs(sortedProjectNamesDsc);
      setSortNamesAsc(false);
    }
  }

  return (
    <div>
      {user && (
        <div className="user-profile-container">
          <div className="user-profile-card">
            <Avatar src={user.photoURL} />
            <h2>{user.displayName}</h2>
            <h4>{user.department.label} | {user.role}</h4>
            <p>{projectCount} Total Projects:</p>
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
          <div className="collection-container">
        <div className="project-container">
        {usersProjects && usersProjects.length === 0 ? <p>*No projects to display*</p> : <h3>{user.displayName}'s  Projects</h3> }
        <table className="project-table">
            <colgroup>
              <col style={{ width: "25%" }} /> {/* Adjust width as needed */}
              <col style={{ width: "10%" }} />
              <col style={{ width: "15%" }} />
              <col style={{ width: "10%" }} />
              <col style={{ width: "15%" }} />
              <col style={{ width: "10%" }} />
            </colgroup>
            <tr>
              <th>
                <div className="header-segment">
                  Name
                  <img
                    className="sort-icon"
                    src={SortIcon}
                    alt="sort icon"
                    onClick={handleProjectNameSort}
                  />
                </div>
              </th>
              <th>Status</th>
              <th>Due Date</th>
              <th>Owner</th>
              <th>Team</th>
              <th>Department</th>
            </tr>
            <tbody>
              {error && <p className="error">{error}</p>}
              {sortedProjectDocs && 
                sortedProjectDocs.map((project) => <ProjectInfo project={project}/>)
              }
            </tbody>
        </table>
        </div>
      </div>
        </div>        
      )}
    </div>
  );
};

export default UserProfile;
