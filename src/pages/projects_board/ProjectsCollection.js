// components
import ProjectList from "./ProjectList";
import ProjectFilter from "./ProjectFilter";

// styles
import "./Projects.css";

export default function ProjectsCollection({ currFilter, setCurrFilter, changeFilter, projects, error, documents }) {

  return (
    <div className="project-container">
      {error && <p className="error">{error}</p>}
      {documents && (
        <ProjectFilter currFilter={currFilter} changeFilter={changeFilter}/>
      )}
      {projects && <ProjectList projects={projects} />}
    </div>
  );
}
