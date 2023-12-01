import { useParams } from "react-router-dom";
import { useCollection } from "../../hooks/useCollection";

// components
import Avatar from "../../components/Avatar";

// styles
import "./Team.css";

const DepartmentInfo = () => {
  const { department } = useParams();
  const { error, documents: users } = useCollection("users");

  console.log("IN DEPARTMENT INFO");
  console.log(users);

  const departmentTeamMembers = users
    ? users.filter((u) => u.department.label === department)
    : [];

  if (error) {
    return <div className="error">{error}</div>;
  }
  if (!document) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div>
      <div className="department-header">
        <h2>{department}</h2>
        <p>{departmentTeamMembers.length} Team Members</p>
      </div>
      <div className="team-avatars">
        {departmentTeamMembers &&
          departmentTeamMembers.map((user) => (
            <div className="team-member-card">
              <Avatar src={user.photoURL} />
              {user.online && <div className="online-dot"></div>}
              <h3>{user.displayName}</h3>
              <p>{user.role}</p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default DepartmentInfo;
