import { useParams } from "react-router-dom";
import { useCollection } from "../../hooks/useCollection";

// styles
import "./Team.css";
import TeamMemberCard from "./TeamMemberCard";

const DepartmentTeamInfo = () => {
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
    <div className="department-info-container">
      <div className="department-header">
        <h2>{department} Team</h2>
      </div>
      <div className="team-members-container">
        {departmentTeamMembers &&
          departmentTeamMembers.map((user) => (
            <TeamMemberCard user={user}/>
          ))}
      </div>
    </div>
  );
};

export default DepartmentTeamInfo;
