import { useAuthContext } from "../../hooks/useAuthContext";
import { useCollection } from "../../hooks/useCollection";
import { useMyProjects } from "../../hooks/useMyProjects";
import { categories } from "../../util/categories";
import { Link } from "react-router-dom";


// styles
import "./Team.css";
import UserInfo from "./UserInfo";
import DepartmentCard from "./DepartmentCard";

export default function TeamDash() {
  const { user } = useAuthContext();
  const { error, documents: userDocuments } = useCollection("users");

  const { myProjects } = useMyProjects();

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
  // console.log(uniqueTeamMembers)

  // getting the full team members object by filtering through user Docs
  const uniqueTeamMembersObject = userDocuments
    ? userDocuments.filter((user) =>
        uniqueTeamMembers.includes(user.displayName)
      )
    : [];

  console.log("USER CONSOLE LOGGED");
  console.log(user.email);
  console.log(userDocuments);

  return (
    <div className="team-dash">
      <div className="department-container">
        {categories.map((category) => (
          <DepartmentCard key={category.value} department={category} />
        ))}
      </div>
      <div className="users-container">
        <div className="user-list">
          <h2>Team</h2>
          <table className="team-table">
            <colgroup>
              <col style={{ width: "20%" }} /> {/* Adjust width as needed */}
              <col style={{ width: "15%" }} />
              <col style={{ width: "23%" }} />
              <col style={{ width: "15%" }} />
              <col style={{ width: "10%" }} />
              <col style={{ width: "12%" }} />

            </colgroup>
            <tr>
              <th>Name</th>
              <th>Status</th>
              <th>Role</th>
              <th>Department</th>
              <th>Projects</th>
              <th>Collaborator</th>
              <th></th>
            </tr>
            <tbody>
            {error ? <div className="error">{error}</div> : <></>}
            {userDocuments &&
              userDocuments.map((user) => 
                  <UserInfo user={user} uniqueTeamMembersObject={uniqueTeamMembersObject} />
                )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}


