import { useState, useEffect, useRef } from 'react';
import Select from "react-select";
import { Link } from "react-router-dom";

// components
import Avatar from "../../components/Avatar"


// styles
import './MyProjectsList.css'

const projectOptions = [
  { value: "open", label: "Open" },
  { value: "inProgress", label: "In Progress" },
  { value: "completed", label: "Completed" },
];

const MyProjectsList = ({ openProjects, inProgressProjects, completedProject }) => {
  const [projectStatus, setProjectStatus] = useState({ value: "open", label: "Open" });
  const [filteredProjects, setFilteredProjects] = useState(openProjects)
  const selectRef = useRef(null);

  useEffect(() => {
    let selectedProjects = [];
    if (projectStatus.value === "open") {
      selectedProjects = openProjects;
    } else if (projectStatus.value === "inProgress") {
      selectedProjects = inProgressProjects;
    } else if (projectStatus.value === "completed") {
      selectedProjects = completedProject;
    }
    setFilteredProjects(selectedProjects);
  }, [projectStatus, openProjects, inProgressProjects, completedProject]);
  

  console.log(projectStatus)
  console.log(filteredProjects)
  console.log(completedProject)
  

  return (
    <div className="my-projects-list-wrapper">
      <div className="my-projects-list-header">
        <h3>My Projects</h3>
        <Select
          className="status-select"
          options={projectOptions}
          onChange={(option) => setProjectStatus(option)}
          // select customize only here - not in css 
          theme={(theme) => ({
            ...theme,
            borderRadius: "5px",
            colors: {
              ...theme.colors,
              primary25: "orange",
              primary: "orange",
            },
          })}
          styles={{
            option: (provided, state) => ({
              ...provided,
              color: "black", // Set the font color for options
            })}}
          placeholder={projectStatus.label}
        />
      </div>
      <div className="filtered-projects-container">        
        {filteredProjects.length > 0 ? filteredProjects.map((p) => 
            <Link to={`/projects/${p.id}`} key={p.id}>
              <div className="my-project-container" key={p.id}>
                <div className="my-project-name">{[...p.name].slice(0, 40)}</div>
                <div className="my-project-team">
                  <div className="avatar-container">
                    {p.assignedUsersList.map((user) => (
                      <Avatar key={user.id} src={user.photoURL} />
                    ))}
                  </div>
                </div>
              </div>
            </Link>
            )
            :
            <p>No {projectStatus.label} Projects</p>
        }        
      </div>
    </div>
  )
}

export default MyProjectsList
