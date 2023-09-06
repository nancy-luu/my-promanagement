import { useAuthContext } from '../hooks/useAuthContext'
import { useCollection } from '../hooks/useCollection'
import Avatar from './Avatar'

// styles
import './OnlineUsers.css'

export default function OnlineUsers() {
    const { user } = useAuthContext();
    const { error: userError, documents: userDocuments} = useCollection('users');
    const { error: projectError, documents: projectDocuments} = useCollection('projects');

    const myTeamProjects = projectDocuments
    ? projectDocuments.filter(projectDoc => 
        projectDoc.assignedUsersList.some(userObj => userObj.displayName === user.displayName)
      )
    : [];

    // flatMap flattens these arrays of display names into a single array instead of 3 arrays
    const assignedUsersDisplayNames = myTeamProjects.flatMap(projectDoc => 
      projectDoc.assignedUsersList.map(userObj => userObj.displayName)
    );

    const teamMembers = Array.from(assignedUsersDisplayNames).filter(
      displayName => displayName !== user.displayName
    );    

    const uniqueTeamMembers = [...new Set(teamMembers)];
    console.log(uniqueTeamMembers)

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
