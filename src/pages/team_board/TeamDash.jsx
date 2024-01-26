import { useState, useEffect } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useCollection } from "../../hooks/useCollection";
import { useMyProjects } from "../../hooks/useMyProjects";
import { categories } from "../../util/categories";
import { Link } from "react-router-dom";
import { tableImgs } from "../../util/images";


// components
import UserInfoCell from "./UserInfoCell";
import DepartmentCard from "./DepartmentCard";

// styles and images
import "./Team.css";

export default function TeamDash() {
  const { user } = useAuthContext();
  const { error, documents: userDocuments } = useCollection("users");
  const { documents: projectDocuments } = useCollection("projects");
  const { myProjects } = useMyProjects();
  const [sortedUserDocuments, setSortedUserDocuments] = useState([]);
  const [sortNamesAsc, setSortNamesAsc] = useState(false);
  const [sortOnline, setSortOnline] = useState(false);
  const [sortRoleAsc, setSortRoleAsc] = useState(false);
  const [sortDeparmetAsc, setSortDeparmentAsc] = useState(false);
  const [sortProjectsDsc, setSortProjectsDsc] = useState(true);
  const [sortCollaborator, setSortCollaborator] = useState(false);



  useEffect(() => {
    setSortedUserDocuments(userDocuments);
  }, [userDocuments]);

  // getting all the names of assigned user for each project
  // flatMap flattens these arrays of display names into a single array instead of multiple arrays
  const assignedUsersDisplayNames = myProjects.flatMap((projectDoc) =>
    projectDoc.assignedUsersList.map((userObj) => userObj.displayName)
  );

  // taking out current user's name from the list
  const teamMembers = Array.from(assignedUsersDisplayNames).filter(
    (displayName) => displayName !== user.displayName
  );

  // creating a list of nonrepeated names
  const uniqueTeamMembers = [...new Set(teamMembers)];

  // getting the full team members object by filtering through user Docs
  const uniqueTeamMembersObject = userDocuments
    ? userDocuments.filter((user) =>
        uniqueTeamMembers.includes(user.displayName)
      )
    : [];

  const collaboratorIds = uniqueTeamMembersObject.map((tm) => tm.id);
  
  const handleNameSort = () => {
    if(!sortNamesAsc) {
      const sortedUserNamesAsc = [...sortedUserDocuments].sort((a, b) => {
        if (a.displayName < b.displayName) {
          return -1;
        }
        if (a.displayName > b.displayName) {
          return 1;
        }
        return 0;
      });
      setSortedUserDocuments(sortedUserNamesAsc);
      setSortNamesAsc(true);
    } else {
      const sortedUserNamesDsc = [...sortedUserDocuments].sort((a, b) => {
        if (a.displayName > b.displayName) {
          return -1;
        }
        if (a.displayName < b.displayName) {
          return 1;
        }
        return 0;
      })
      console.log(sortedUserNamesDsc)
      setSortedUserDocuments(sortedUserNamesDsc);
      setSortNamesAsc(false);
    }
  };

  const handleOnlineSort = () => {
    if(!sortOnline){
      const onlineUsersFirst = [...sortedUserDocuments].sort((a, b) => {
        if(a.online){
          return -1;
        }
        if(!a.online){
          return 1;
        }
        return 0;
      })
      setSortedUserDocuments(onlineUsersFirst);
      setSortOnline(true)
    } else {
      const onlineUsersFirst = [...sortedUserDocuments].sort((a, b) => {
        if(!a.online){
          return -1;
        }
        if(a.online){
          return 1;
        }
        return 0;
      })
      setSortedUserDocuments(onlineUsersFirst);
      setSortOnline(false)
    }
  }

  const handleRoleSort = () => {
    if(!sortRoleAsc) {
      const sortedRoleNamesAsc = [...sortedUserDocuments].sort((a, b) => {
        if(a.role < b.role) {
          return -1;
        }
        if(b.role > a.role) {
          return 1;
        }
        return 0;
      })
      setSortedUserDocuments(sortedRoleNamesAsc);
      setSortRoleAsc(true);
    } else {
      const sortedRoleNamesAsc = [...sortedUserDocuments].sort((a, b) => {
        if(a.role > b.role) {
          return -1;
        }
        if(b.role < a.role) {
          return 1;
        }
        return 0;
      })
      setSortedUserDocuments(sortedRoleNamesAsc);
      setSortRoleAsc(false);
    }
  }

  const handleDepartmentSort = () => {
    if(!sortDeparmetAsc){
      const sortedDepartmentAsc = [...sortedUserDocuments].sort((a, b) => {
        if(a.department.value < b.department.value){
          return -1;
        }
        if(b.department.value > a.department.value){
          return 1;
        }
        return 0;
      })
      setSortedUserDocuments(sortedDepartmentAsc)
      setSortDeparmentAsc(true);
    } else {
      const sortedDepartmentAsc = [...sortedUserDocuments].sort((a, b) => {
        if(a.department.value > b.department.value){
          return -1;
        }
        if(b.department.value < a.department.value){
          return 1;
        }
        return 0;
      })
      setSortedUserDocuments(sortedDepartmentAsc)
      setSortDeparmentAsc(false);
    }
  }

  const handleProjectSort = () => {
    if(sortProjectsDsc){
      const sortedUserByProjectCount = [...sortedUserDocuments].sort((a, b) => {
        const projectsA = projectDocuments.filter((projectDoc) =>
          projectDoc.assignedUsersList.some((userObj) => userObj.displayName === a.displayName)
        );
        const projectCountA = projectsA.length;
    
        const projectsB = projectDocuments.filter((projectDoc) =>
          projectDoc.assignedUsersList.some((userObj) => userObj.displayName === b.displayName)
        );
        const projectCountB = projectsB.length;
    
        return projectCountB - projectCountA; 
      });
    
      setSortedUserDocuments(sortedUserByProjectCount);
      setSortProjectsDsc(false)
    } else {
      const sortedUserByProjectCount = [...sortedUserDocuments].sort((a, b) => {
        const projectsA = projectDocuments.filter((projectDoc) =>
          projectDoc.assignedUsersList.some((userObj) => userObj.displayName === a.displayName)
        );
        const projectCountA = projectsA.length;
    
        const projectsB = projectDocuments.filter((projectDoc) =>
          projectDoc.assignedUsersList.some((userObj) => userObj.displayName === b.displayName)
        );
        const projectCountB = projectsB.length;
    
        return projectCountA - projectCountB; 
      });
    
      setSortedUserDocuments(sortedUserByProjectCount);
      setSortProjectsDsc(true)
    }
  };

  const handleCollaboratorSort = () => {
    if(!sortCollaborator) {
      const sortCollaboratorsFirst = [...sortedUserDocuments].sort((a, b) => {
        const isCollaboratorA = collaboratorIds.includes(a.id);
        const isCollaboratorB = collaboratorIds.includes(b.id);
    
        if (isCollaboratorA && !isCollaboratorB) {
          return -1; 
        } else if (!isCollaboratorA && isCollaboratorB) {
          return 1;
        }
    
        // fallback sort if not collaborator
        if (a.displayName < b.displayName) {
          return -1;
        } else if (a.displayName > b.displayName) {
          return 1;
        }
        return 0;
      });
    
      setSortedUserDocuments(sortCollaboratorsFirst);
      setSortCollaborator(true);

    } else {
      const sortCollaboratorsLast = [...sortedUserDocuments].sort((a, b) => {
        const isCollaboratorA = collaboratorIds.includes(a.id);
        const isCollaboratorB = collaboratorIds.includes(b.id);
    
        if (isCollaboratorA && !isCollaboratorB) {
          return 1;
        } else if (!isCollaboratorA && isCollaboratorB) {
          return -1;
        }
    
        // fallback sort if not collaborator
        if (a.displayName < b.displayName) {
          return -1;
        } else if (a.displayName > b.displayName) {
          return 1;
        }
        return 0;
      });
      setSortedUserDocuments(sortCollaboratorsLast);
      setSortCollaborator(false);
    }
    }
   

  return (
    <div className="team-dash">
      <div className="department-container">
        {categories.map((category) => (
          <Link to={`/team/${category.label}`}>
            <DepartmentCard key={category.label} department={category} />
          </Link>
        ))}
      </div>
      <div className="users-container">
        <div className="user-list">
          <h2>All Users</h2>
          <div className="table-container">
            <table className="team-table">
              {/* <colgroup>
                <col style={{ width: "20%" }} /> 
                <col style={{ width: "15%" }} />
                <col style={{ width: "25%" }} />
                <col style={{ width: "15%" }} />
                <col style={{ width: "10%" }} />
              </colgroup> */}
              <tr>
                <th>
                  <div className="header-segment">
                    Name
                    <img
                      className="sort-icon"
                      src={tableImgs.sortIcon}
                      alt="sort icon"
                      onClick={handleNameSort}
                    />
                  </div>
                </th>
                <th>
                  <div className="header-segment">
                    Status
                    <img
                      className="sort-icon"
                      src={tableImgs.sortIcon}
                      alt="sort icon"
                      onClick={handleOnlineSort}
                    />
                  </div>
                </th>
                <th>
                  <div className="header-segment">
                    Role
                    <img
                      className="sort-icon"
                      src={tableImgs.sortIcon}
                      alt="sort icon"
                      onClick={handleRoleSort}
                    />
                  </div>
                </th>
                <th>
                  <div className="header-segment">
                    Department
                    <img
                      className="sort-icon"
                      src={tableImgs.sortIcon}
                      alt="sort icon"
                      onClick={handleDepartmentSort}
                    />
                  </div>
                </th>
                <th>
                  <div className="header-segment">
                    Projects
                    <img
                      className="sort-icon"
                      src={tableImgs.sortIcon}
                      alt="sort icon"
                      onClick={handleProjectSort}
                    />
                  </div>
                </th>
                <th>
                  <div className="header-segment">
                    Collaborator
                    <img
                      className="sort-icon"
                      src={tableImgs.sortIcon}
                      alt="sort icon"
                      onClick={handleCollaboratorSort}
                    />
                  </div>
                </th>
              </tr>
              <tbody>
                {error ? <div className="error">{error}</div> : <></>}
                {sortedUserDocuments && sortedUserDocuments.map((user) => (
                  <UserInfoCell
                    key={user.id}
                    user={user}
                    uniqueTeamMembersObject={uniqueTeamMembersObject}
                    projectDocuments={projectDocuments}
                    collaboratorIds={collaboratorIds}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
