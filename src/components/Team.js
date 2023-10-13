import { useAuthContext } from '../hooks/useAuthContext'
import { useCollection } from '../hooks/useCollection'
import { useMyProjects } from '../hooks/useMyProjects';
import Avatar from './Avatar'

// styles
import './Team.css'

export default function OnlineUsers() {
    const { user } = useAuthContext();
    const { documents: userDocuments } = useCollection('users');

    const { myProjects } = useMyProjects();

    // getting all the names of assigned user for each project
    // flatMap flattens these arrays of display names into a single array instead of multiple arrays
    const assignedUsersDisplayNames = myProjects.flatMap(projectDoc => 
      projectDoc.assignedUsersList.map(userObj => userObj.displayName)
    );

    // taking out user's name from the list
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

  return (
    <div className="users-container">
      <div className="user-list">
        <h2>Team:</h2>
          {/* {error & <div className="error">{error}</div>} */}
          {/* Need to ensure document is not null first */}
          {userDocuments && userDocuments.map((user) => (
            <div key={user.id} className="user-list-item">
                  <div className="avatar-online-container">
                      {user.online && <span className="online-user"></span>}
                      <Avatar src={user.photoURL}/>
                  </div>
                  <span>{user.displayName}</span>
              </div>
          ))}
      </div>
      <div className="team-list">
        <h2>Collaborators:</h2>
          {/* {error & <div className="error">{error}</div>} */}
          {/* Need to ensure document is not null first */}
          {uniqueTeamMembersObject && uniqueTeamMembersObject.map((user) => (
            <div key={user.id} className="team-list-item">
                  <div className="avatar-online-container">
                      {user.online && <span className="online-user"></span>}
                      <Avatar src={user.photoURL}/>
                  </div>
                  <span>{user.displayName}</span>
              </div>
          ))}
      </div>
    </div>
  )
}
