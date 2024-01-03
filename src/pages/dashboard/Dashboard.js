import { useMyProjects } from "../../hooks/useMyProjects";

// components
import Overview from "./Overview";
import SmallCalendar from "./SmallCalendar";
import PriorityTasks from "./PriorityTasksList";
import NewCommentsList from "./NewCommentsList";
import Collaborators from "./Collaborators";

// styles
import "./Dashboard.css";
import MyProjectsList from "./MyProjectsList";

const Dashboard = () => {
  const { myProjects, openProjects, inProgressProjects, completedProject } = useMyProjects();

  return (
    <div className="dashboard-container">
      <div className="overview">
        <Overview />
      </div>
      <div className="small-cal">
        <SmallCalendar />
      </div>      
      <div className="tasks">
        <PriorityTasks />
      </div>
      <div className="comments">
        <NewCommentsList projects={myProjects} />
      </div>
      <div className="my-projects">
        <MyProjectsList openProjects={openProjects} inProgressProjects={inProgressProjects} completedProject={completedProject}/>
      </div>
      <div className="collabs">
        <Collaborators />
      </div>
    </div>
  );
};

export default Dashboard;
