import { useState } from "react";
import { useCollection } from "../../hooks/useCollection";
import { useAuthContext } from "../../hooks/useAuthContext";
import ProjectList from "../../components/ProjectList";
import ProjectFilter from "./ProjectFilter";

// styles
import "./ProjectsBoard.css";

export default function Project() {
  const [currFilter, setCurrFilter] = useState("all");
  const { documents, error } = useCollection("projects");
  const { user } = useAuthContext();

  const changeFilter = (newFilter) => {
    setCurrFilter(newFilter);
  };

  const projects = documents ? documents.filter(document => {
    switch (currFilter) {
      case 'all':
        return true;
      case 'assigned':
        let assigned = false;
        document.assignedUsersList.forEach(u => {
          if(u.id === user.uid) {
            assigned = true
          }
        })
        return assigned
      case 'development':
      case 'design':
      case 'marketing':
      case 'product':
      case 'research':
      case 'sales':
        console.log(document.category, currFilter)
        return document.category === currFilter
      default: 
        return true
    }
  }) : null

  return (
    <div className="project-container">
      <h2 className="page-title">Projects</h2>
      {error && <p className="error">{error}</p>}
      {documents && (
        <ProjectFilter currFilter={currFilter} changeFilter={changeFilter}/>
      )}
      {projects && <ProjectList projects={projects} />}
    </div>
  );
}
