import { useAuthContext } from '../../hooks/useAuthContext'
import { useCollection } from '../../hooks/useCollection'
import { useMyProjects } from '../../hooks/useMyProjects';
import { categories } from "../../util/categories";


// components
import Avatar from '../../components/Avatar'

// styles
import './Team.css'
import UserInfoCard from './UserInfoCard';
import DepartmentCard from './DepartmentCard';

// const departmentList = ['development', 'design', 'marketing', 'product', 'research', 'sales']

export default function TeamDash() {
    const { user } = useAuthContext();
    const { documents: userDocuments } = useCollection('users');

    const { myProjects } = useMyProjects();

    // getting all the names of assigned user for each project
    // flatMap flattens these arrays of display names into a single array instead of multiple arrays
    const assignedUsersDisplayNames = myProjects.flatMap(projectDoc => 
      projectDoc.assignedUsersList.map(userObj => userObj.displayName)
    );

    // taking out current user's name from the list
    const teamMembers = Array.from(assignedUsersDisplayNames).filter(
      displayName => displayName !== user.displayName
    );    

    // creating a list of nonrepeated names
    const uniqueTeamMembers = [...new Set(teamMembers)];
    // console.log(uniqueTeamMembers)

    // getting the full team members object by filtering through user Docs 
    const uniqueTeamMembersObject = userDocuments
      ? userDocuments.filter(user => uniqueTeamMembers.includes(user.displayName))
      : [];

      console.log("USER CONSOLE LOGGED")
    console.log(user.email)
    console.log(userDocuments)
  

  return (
    <div className="users-container">
      <div className="department-container">
      {categories.map((category) => (
        <DepartmentCard key={category.value} department={category} />
      ))}
      </div>
      <div className="user-list">
        <h2>Team:</h2>
          {/* {error & <div className="error">{error}</div>} */}
          {/* Need to ensure document is not null first */}
          {userDocuments && userDocuments.map((user) => (
            <UserInfoCard user={user}/>
          ))}
      </div>
      <div className="team-list">
        <h2>Collaborators:</h2>
          {/* {error & <div className="error">{error}</div>} */}
          {/* Need to ensure document is not null first */}
          {uniqueTeamMembersObject && uniqueTeamMembersObject.map((user) => (
            <UserInfoCard user={user}/>
          ))}
      </div>
    </div>
  )
}
