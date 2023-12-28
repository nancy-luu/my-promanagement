import { useState, useEffect } from "react";
import { useCollection } from "../../hooks/useCollection";
import { useAuthContext } from "../../hooks/useAuthContext";
import { NavLink } from "react-router-dom";

// components
import ProjectFilter from "./ProjectFilter";
import ProjectsStats from "./ProjectsStats";
import NewCommentsList from "../dashboard/NewCommentsList";
import ProjectInfo from "./ProjectInfo";

// styles and images
import "./Projects.css";
import SortIcon from "../../assets/sort-icon.png";


const ProjectsDash = () => {
  const { documents, error } = useCollection("projects");
  const { user } = useAuthContext();

  const [currFilter, setCurrFilter] = useState("all");
  const [changedProjects, setChangedProjects] = useState([]);
  const [sortedProjects, setSortedProjects] = useState([]);
  const [sortNamesAsc, setSortNamesAsc] = useState(false);
  const [sortStatus, setSortStatus] = useState(false);

  useEffect(() => {
    setChangedProjects(documents)
  }, [documents])
  
  const projects = documents
    ? documents.filter((document) => {
        switch (currFilter) {
          case "all":
            return true;
          case "assigned":
            let assigned = false;
            document.assignedUsersList.forEach((u) => {
              if (u.id === user.uid) {
                assigned = true;
              }
            });
            return assigned
          case "development":
          case "design":
          case "marketing":
          case "product":
          case "research":
          case "sales":
            return document.category === currFilter;
          default:
            return true;
        }
      })
    : null
  ;


  const sortedProjectsByName = projects
  ? [...projects].sort((a, b) => {
      if (!sortNamesAsc) {
        return a.name.localeCompare(b.name); 
      } else {
        return b.name.localeCompare(a.name); 
      }
    })
  : null;

const changeFilter = (newFilter) => {
  setCurrFilter(newFilter);
};

const handleNameSort = () => {
  setSortNamesAsc((prev) => !prev); 
};


  return (
    <div className="projects-dash-container">
      <div className="projects-dash-navbar">
        <NavLink to="/createProject">
          <button className="btn">New Project</button>
        </NavLink>
        {documents && (
          <ProjectFilter currFilter={currFilter} changeFilter={changeFilter} />
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
          {projects && <NewCommentsList projects={projects} />}
        </div>
      </div>
      <div className="collection-container">
        <div className="project-container">
        {projects && projects.length === 0 ? <p>*No projects to display*</p> : <h3>All Projects</h3> }
          <table className="project-table">
              <colgroup>
                <col style={{ width: "25%" }} /> {/* Adjust width as needed */}
                <col style={{ width: "10%" }} />
                <col style={{ width: "15%" }} />
                <col style={{ width: "10%" }} />
                <col style={{ width: "15%" }} />
                <col style={{ width: "10%" }} />
              </colgroup>
              <tr>
                <th>
                  <div className="header-segment">
                    Name
                    <img 
                      className="sort-icon"
                      src={SortIcon}
                      alt="sort icon"
                      onClick={handleNameSort}
                    ></img>
                  </div>
                </th>
                <th>
                <div className="header-segment">
                    Status
                    <img 
                      className="sort-icon"
                      src={SortIcon}
                      alt="sort icon"
                      // onClick={handleStatusSort}
                    ></img>
                  </div>
                </th>
                <th>
                <div className="header-segment">
                    Due Date
                    <img 
                      className="sort-icon"
                      src={SortIcon}
                      alt="sort icon"
                    ></img>
                  </div>
                </th>
                <th>
                  <div className="header-segment">
                    Owner
                    <img 
                      className="sort-icon"
                      src={SortIcon}
                      alt="sort icon"
                    ></img>
                  </div>
                </th>
                <th>
                  <div className="header-segment">
                    Team
                    <img 
                      className="sort-icon"
                      src={SortIcon}
                      alt="sort icon"
                    ></img>
                  </div>
                </th>
                <th>
                  <div className="header-segment">
                    Department
                    <img 
                      className="sort-icon"
                      src={SortIcon}
                      alt="sort icon"
                    ></img>
                  </div>
                </th>
              </tr>
              <tbody>
                {error && <p className="error">{error}</p>}
                {sortedProjectsByName && 
                  sortedProjectsByName.map((project) => <ProjectInfo project={project}/>)
                }
              </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProjectsDash;
