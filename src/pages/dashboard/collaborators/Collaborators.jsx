import { Link } from "react-router-dom";
import { useAuthContext } from "../../../hooks/useAuthContext";
import { useCollection } from "../../../hooks/useCollection";
import { useMyProjects } from "../../../hooks/useMyProjects";

// components 
import Avatar from "../../../components/Avatar";

// styles
import "./Collaborators.css";

const Collaborators = () => {
  const { user } = useAuthContext();
  const { documents: userDocuments } = useCollection("users");

  const { myProjects } = useMyProjects();

  // getting all the names of assigned user for each project
  // flatMap flattens these arrays of display names into a single array instead of multiple arrays
  const assignedUsersDisplayNames = myProjects.flatMap((projectDoc) =>
    projectDoc.assignedUsersList.map((userObj) => userObj.displayName)
  );

  // taking out user's name from the list
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

  return (
    <>
        <div className="grid-one-item grid-common grid-c1">
            <h3>Collaborators</h3>
            {uniqueTeamMembersObject.length > 0 ? (
              <>
                <div className="collaborators-form">    
                    {uniqueTeamMembersObject &&
                        uniqueTeamMembersObject.map((user) => (
                        <Link to={`/team/user/${user.id}`}>
                          <div div key={user.id} className="collaborator-card">
                              {user.online && <span className="online-user"></span>}
                              <div className="collaborator-avatar">
                              <Avatar src={user.photoURL} />
                              </div>
                              <div className="collaborator-detail">
                                <h4 className="user-displayname">{user.displayName}</h4>
                                <p className="user-role">{user.role}</p>
                              </div>
                          </div>
                        </Link>
                        ))}
                </div>
              </>
              ):(
              <>
                <div className="nothing-to-display">
                  <p>No collaborators to display</p>
                  <Link to={"/createProject"}> yet!</Link>
                </div>
              </>
            )}
        </div>
    </>
  );
};

export default Collaborators;
