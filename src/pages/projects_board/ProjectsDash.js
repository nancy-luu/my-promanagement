import { useState } from "react";
import { useCollection } from "../../hooks/useCollection";
import { useAuthContext } from "../../hooks/useAuthContext";

// components
import ProjectsCollection from "./ProjectsCollection";

// styles
import "./Projects.css";
import ProjectsStats from "./ProjectsStats";

const ProjectsDash = () => {
  const { documents, error } = useCollection("projects");
  const { user } = useAuthContext(); 

  const [currFilter, setCurrFilter] = useState("all");

  const changeFilter = (newFilter) => {
    setCurrFilter(newFilter);
  };

  const projectsOrderedByDate = documents ? [...documents].sort((a, b) => a.dueDate.toDate() - b.dueDate.toDate()) : [];

  const projects = projectsOrderedByDate ? projectsOrderedByDate.filter(document => {
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

  // console.log("PROJECTS -------------------")
  // console.log(projects)

  return (
    <div className="projects-dash-container">
        <div className="stats-tasks-container">
            <ProjectsStats
              projects={projects} 
              documents={documents}
              error={error} 
              currFilter={currFilter} 
              setCurrFilter={setCurrFilter} 
              changeFilter={changeFilter} 
            />  
        </div>
        <div className="collection-container">
            <ProjectsCollection 
              projects={projects} 
              documents={documents}
              error={error} 
              currFilter={currFilter} 
              setCurrFilter={setCurrFilter} 
              changeFilter={changeFilter} 
            />
        </div>
    </div>
  )
}

export default ProjectsDash
