import { useState } from "react";
import { useCollection } from "../../hooks/useCollection";
import { useAuthContext } from "../../hooks/useAuthContext";
import { NavLink } from "react-router-dom";


// components
import ProjectsCollection from "./ProjectsCollection";
import ProjectFilter from "./ProjectFilter";
import ProjectsStats from "./ProjectsStats";

// styles
import "./Projects.css";
import NewCommentsList from "../dashboard/NewCommentsList";

const ProjectsDash = () => {
  const { documents, error } = useCollection("projects");
  const { user } = useAuthContext(); 

  const [currFilter, setCurrFilter] = useState("all");

  const projectsOrderedByDate = documents && [...documents].sort((a, b) => a.dueDate.toDate() - b.dueDate.toDate())

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
  console.log(projects)

  const changeFilter = (newFilter) => {
    setCurrFilter(newFilter);
  };


  return (
    <div className="projects-dash-container">
        <div className="projects-dash-navbar">
            <NavLink to="/createProject">
              <button className="btn">New Project</button>
            </NavLink>
            {documents && (
              <ProjectFilter currFilter={currFilter} changeFilter={changeFilter}/>
            )}
        </div>
        <div className="project-stats-comments-container">
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
          <div className="new-comments-list-container">
                {projects && <NewCommentsList projects={projects}/>}
          </div>
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
