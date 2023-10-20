// components
import ProjectList from "./ProjectList";

// styles
import "./Projects.css";

export default function ProjectsCollection({ currFilter, setCurrFilter, changeFilter, projects, error, documents }) {

  return (
    <div className="project-container">
      {error && <p className="error">{error}</p>}
      {projects && <ProjectList projects={projects} />}
    </div>
  );
}
