// components
import ProjectsCollection from "./ProjectsCollection";

// styles
import "./Projects.css";
import ProjectsStats from "./ProjectsStats";

const ProjectsDash = () => {
  return (
    <div className="projects-dash-container">
        <div className="stats-tasks-container">
            <ProjectsStats />
        </div>
        <div className="collection-container">
            <ProjectsCollection />
        </div>
    </div>
  )
}

export default ProjectsDash
