import { useParams } from "react-router-dom";
import { useDocument } from "../../hooks/useDocument";
import { useCollection } from "../../hooks/useCollection";


// components
import Avatar from "../../components/Avatar";

const UserProfile = () => {
  const { id } = useParams();
  const { error: userError, document: user } = useDocument("users", id);
  const { error: projectError, documents: projects } = useCollection("projects");

  const usersProjects = projects ? projects.filter(projectDoc =>
    projectDoc.assignedUsersList.some(userObj => userObj.id === id)
    ) 
    : 
    []
    ;

  console.log(document);

  if (userError) {
    return <div className="error">{userError}</div>;
  }
  if (!document) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div>
      {user && (
        <div className="user-profile-card">
          <Avatar src={user.photoURL} />
          <h2>{user.displayName}</h2>
          <h4>{user.department.label} | {user.role}</h4>
          {usersProjects ? usersProjects.map((project) => <div>{project.name}</div>) : []}
        </div>
      )}
    </div>
  );
};

export default UserProfile;
