import { useState, useEffect, useMemo } from "react";
import { useCollection } from "../../hooks/useCollection";
import { useAuthContext } from "../../hooks/useAuthContext";
import { NavLink } from "react-router-dom";

// components
import ProjectFilter from "./ProjectFilter";
import ProjectsStats from "./ProjectsStats";
import NewCommentsList from "../dashboard/new-comments/NewCommentsList";
import ProjectInfo from "./ProjectInfo";

// styles and images
import "./ProjectsDash.css";
import SortIcon from "../../assets/sort-icon.png";
 

const ProjectsDash = () => {
  const { documents, error } = useCollection("projects");
  const { user } = useAuthContext();

  const [currFilter, setCurrFilter] = useState("all");
  const [sortedProjects, setSortedProjects] = useState({});
  const [activeSort, setActiveSort] = useState("none");
  const [sortNamesAsc, setSortNamesAsc] = useState(false);
  const [sortStatusAsc, setSortStatusAsc] = useState(false);
  const [sortDateDsc, setSortDateDsc] = useState(false);
  const [sortOwnerAsc, setSortOwnerAsc] = useState(false);
  const [sortDepartmentAsc, setSortDepartmentAsc] = useState(false);


  useEffect(() => {
    if (documents) {
      const categories = ["all", "assigned", "design", "development", "marketing", "product", "research", "sales"];
  
      const categorizedProjects = categories.reduce((acc, category) => {
        switch (category) {
          case "all":
            acc[category] = documents;
            break;
          case "assigned":
            acc[category] = documents.filter((project) =>
              project.assignedUsersList.some((u) => u.id === user.uid)
            );
            break;
          case "design":
          case "development":
          case "marketing":
          case "product":
          case "research":
          case "sales":
            acc[category] = documents.filter((project) => project.category === category);
            break;
          default:
            break;
        }
        return acc;
      }, {});
  
      setSortedProjects(categorizedProjects);
    }
  }, [documents, user.uid]);

  const getSortedProjectsForCurrentFilter = () => {
    const currentProjects = sortedProjects[currFilter];
    if (currentProjects) {
      // Copies for sorting individually
      let sortedProjectsCopy = [...currentProjects];
      let sortedByName = [...currentProjects];
      let sortedByStatus = [...currentProjects];
      let sortedByDate = [...currentProjects];
      let sortedByOwner = [...currentProjects];
      let sortedByDepartment = [...currentProjects];
        
      if (sortNamesAsc) {
        sortedByName.sort((a, b) => a.name.localeCompare(b.name));
      } else {
        sortedByName.sort((a, b) => b.name.localeCompare(a.name));
      }
    

      if (!sortStatusAsc) {
        sortedByStatus.sort((a, b) => {
          const isACompleted = a.isCompleted;
          const isBCompleted = b.isCompleted;
          const aHasComments = a.comments && a.comments.length > 0;
          const bHasComments = b.comments && b.comments.length > 0;

          if (isACompleted && isBCompleted) {
            return 0;
          } else if (isACompleted && !isBCompleted) {
            return 1;
          } else if (!isACompleted && isBCompleted) {
            return -1;
          } else if (!isACompleted && !isBCompleted) {
            if (!aHasComments && bHasComments) {
              return -1;
            } else if (aHasComments && !bHasComments) {
              return 1;
            } else {
              return 0;
            }
          }
        });
      } else {
        sortedByStatus.sort((a, b) => {
          const isACompleted = a.isCompleted;
          const isBCompleted = b.isCompleted;
          const aHasComments = a.comments && a.comments.length > 0;
          const bHasComments = b.comments && b.comments.length > 0;

          if (isACompleted && isBCompleted) {
            return 0;
          } else if (isACompleted && !isBCompleted) {
            return -1;
          } else if (!isACompleted && isBCompleted) {
            return 1;
          } else if (!isACompleted && !isBCompleted) {
            if (aHasComments && !bHasComments) {
              return -1;
            } else if (!aHasComments && bHasComments) {
              return 1;
            } else {
              return 0;
            }
          }
        });
      }


      if (!sortDateDsc) {
        sortedByDate.sort((a, b) => b.dueDate - a.dueDate);
      } else {
        sortedByDate.sort((a, b) => a.dueDate - b.dueDate);
      }


      if (sortOwnerAsc) {
        sortedByOwner.sort((a, b) => a.createdBy.displayName.localeCompare(b.createdBy.displayName));
      } else {
        sortedByOwner.sort((a, b) => b.createdBy.displayName.localeCompare(a.createdBy.displayName));
      }


      if (sortDepartmentAsc) {
        sortedByDepartment.sort((a, b) => a.category.localeCompare(b.category));
      } else {
        sortedByDepartment.sort((a, b) => b.category.localeCompare(a.category));
      }

      switch (activeSort) {
        case "name":
          return sortedByName;
        case "status":
          return sortedByStatus;
        case "date":
          return sortedByDate;
        case "owner":
          return sortedByOwner;
        case "department":
          console.log("DEPARTMENT PROJECTS")
          console.log(sortedByDepartment)
          return sortedByDepartment;
        default:
          return sortedProjectsCopy;
      }
    }
    return [];
  };
  

  const handleProjectsUpdate = () => {
    const updatedSortedProjects = { ...sortedProjects };
    updatedSortedProjects[currFilter] = getSortedProjectsForCurrentFilter();
    setSortedProjects(updatedSortedProjects);
  };

  useEffect(() => {
    handleProjectsUpdate();
  }, [currFilter, sortNamesAsc, sortStatusAsc, sortDateDsc, sortOwnerAsc, sortDepartmentAsc])


const changeFilter = (newFilter) => {
  setCurrFilter(newFilter);
};

const handleNameSort = () => {
  setSortNamesAsc((prev) => !prev); 
  setActiveSort("name")
};

const handleStatusSort = () => {
  setSortStatusAsc((prev) => !prev); 
  setActiveSort("status")
};

const handleDateSort = () => {
  setSortDateDsc((prev) => !prev);
  setActiveSort("date")
}

const handleOwnerSort = () => {
  setSortOwnerAsc((prev) => !prev);
  setActiveSort("owner")
}

const handleDepartmentSort = () => {
  setSortDepartmentAsc((prev) => !prev);
  setActiveSort("department")
}


  return (
    <div className="main-content-container">
        <div className="projects-dash-navbar">
          <NavLink to="/createProject">
            <button className="newproject-btn btn">New Project</button>
          </NavLink>
          {documents && (
            <ProjectFilter currFilter={currFilter} changeFilter={changeFilter} />
          )}
        </div>
        <div className="project-stats-comments-container">
            <ProjectsStats
              projects={sortedProjects[currFilter]}
              documents={documents}
              error={error}
              currFilter={currFilter}
              setCurrFilter={setCurrFilter}
              changeFilter={changeFilter}
            />
          <div className="new-comments-list-container">
            {sortedProjects && <NewCommentsList projects={sortedProjects[currFilter]} />}
          </div>
        </div>
      <div className="collection-container">
        <div className="grid-common">
        {sortedProjects && sortedProjects.length === 0 ? <p>*No projects to display*</p> : <h3>All Projects</h3> }
          <table className="project-table">
              <colgroup>
                <col style={{ width: "25%" }} /> 
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
                      alt="name sort icon"
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
                      alt="status sort icon"
                      onClick={handleStatusSort}
                    ></img>
                  </div>
                </th>
                <th>
                <div className="header-segment">
                    Due Date
                    <img 
                      className="sort-icon"
                      src={SortIcon}
                      alt="date sort icon"
                      onClick={handleDateSort}
                    ></img>
                  </div>
                </th>
                <th>
                  <div className="header-segment">
                    Owner
                    <img 
                      className="sort-icon"
                      src={SortIcon}
                      alt="owner sort icon"
                      onClick={handleOwnerSort}
                    ></img>
                  </div>
                </th>
                <th>
                  <div className="header-segment">
                    Team
                  </div>
                </th>
                <th>
                  <div className="header-segment">
                    Department
                    <img 
                      className="sort-icon"
                      src={SortIcon}
                      alt="department sort icon"
                      onClick={handleDepartmentSort}
                    ></img>
                  </div>
                </th>
              </tr>
              <tbody>
                {error && <p className="error">{error}</p>}
                {sortedProjects[currFilter] && 
                  sortedProjects[currFilter].map((project) => <ProjectInfo project={project}/>)
                }
              </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProjectsDash;
