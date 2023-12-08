import { useState, useEffect } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useCollection } from "../../hooks/useCollection";
import { useMyProjects } from "../../hooks/useMyProjects";
import { categories } from "../../util/categories";
import { Link } from "react-router-dom";

// components
import UserInfo from "./UserInfo";
import DepartmentCard from "./DepartmentCard";

// styles and images
import "./Team.css";
import SortIcon from "../../assets/sort-icon.png";

export default function TeamDash() {
  const { user } = useAuthContext();
  const { error, documents: userDocuments } = useCollection("users");
  const { myProjects } = useMyProjects();
  const [sortedUserDocuments, setSortedUserDocuments] = useState([]);
  const [sortNamesAsc, setSortNamesAsc] = useState(false);
  const [sortOnline, setSortOnline] = useState(false);
  const [sortRoleAsc, setSortRoleAsc] = useState(false);


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
          <table className="team-table">
            <colgroup>
              <col style={{ width: "20%" }} /> 
              <col style={{ width: "15%" }} />
              <col style={{ width: "25%" }} />
              <col style={{ width: "15%" }} />
              <col style={{ width: "10%" }} />
            </colgroup>
            <tr>
              <th>
                Name
                <img
                  className="sort-icon"
                  src={SortIcon}
                  alt="dashboard icon"
                  onClick={handleNameSort}
                />
              </th>
              <th>
                Status
                <img
                  className="sort-icon"
                  src={SortIcon}
                  alt="dashboard icon"
                  onClick={handleOnlineSort}
                />
              </th>
              <th>
                Role
                <img
                  className="sort-icon"
                  src={SortIcon}
                  alt="dashboard icon"
                  onClick={handleRoleSort}
                />
              </th>
              <th>Department</th>
              <th>Projects</th>
              <th>Collaborator</th>
            </tr>
            <tbody>
              {error ? <div className="error">{error}</div> : <></>}
              {sortedUserDocuments && sortedUserDocuments.map((user) => (
                <UserInfo
                  key={user.id}
                  user={user}
                  uniqueTeamMembersObject={uniqueTeamMembersObject}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
