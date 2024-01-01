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
  const [sortedProjects, setSortedProjects] = useState({});
  const [activeSort, setActiveSort] = useState("none");
  const [sortNamesAsc, setSortNamesAsc] = useState(false);
  const [sortStatusAsc, setSortStatusAsc] = useState(false);
  const [sortDateDsc, setSortDateDsc] = useState(false);
  const [sortOwnerAsc, setSortOwnerAsc] = useState(false);


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
      let sortedProjectsCopy = [...currentProjects];

         // Make copies for sorting individually
    let sortedByName = [...currentProjects];
    let sortedByStatus = [...currentProjects];
    let sortedByDate = [...currentProjects];
      
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
            if (!aHasComments && bHasComments) {
              return -1;
            } else if (aHasComments && !bHasComments) {
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

      if (!sortOwnerAsc) {
        const sortedProjectNamesAsc = [...sortedProjectsCopy].sort((a, b) => a.createdBy.displayName.localeCompare(b.createdBy.displayName));
        sortedProjectsCopy = sortedProjectNamesAsc
      } else {
        const sortedProjectNamesDsc = [...sortedProjectsCopy].sort((a, b) => b.createdBy.displayName.localeCompare(a.createdBy.displayName));
        sortedProjectsCopy = sortedProjectNamesDsc
      }

      switch (activeSort) {
        case "name":
          return sortedByName;
        case "status":
          return sortedByStatus;
        case "date":
          return sortedByDate;
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
  }, [currFilter, sortNamesAsc, sortStatusAsc, sortDateDsc, sortOwnerAsc])


  // console.log("This is the set sorted projects")
  // console.log(sortedProjects);
  // console.log('\n')

  // console.log('This is curr filter')
  // console.log(currFilter)
  // console.log('\n')

  console.log("----------------")
  console.log("Sort names state: " + sortNamesAsc)
  console.log("Sort status state: " + sortStatusAsc)
  console.log("Sort date state: " + sortDateDsc)
  console.log("\n")

  

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
            projects={sortedProjects[currFilter]}
            documents={documents}
            error={error}
            currFilter={currFilter}
            setCurrFilter={setCurrFilter}
            changeFilter={changeFilter}
          />
        </div>
        <div className="new-comments-list-container">
          {sortedProjects && <NewCommentsList projects={sortedProjects[currFilter]} />}
        </div>
      </div>
      <div className="collection-container">
        <div className="project-container">
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
                      alt="sort icon"
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
                      alt="sort icon"
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
                      alt="sort icon"
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







// 
  // const projects = changedProjects
  //   ? changedProjects.filter((project) => {
  //       switch (currFilter) {
  //         case "all":
  //           return true;
  //         case "assigned":
  //           let assigned = false;
  //           project.assignedUsersList.forEach((u) => {
  //             if (u.id === user.uid) {
  //               assigned = true;
  //             }
  //           });
  //           return assigned
  //         case "development":
  //         case "design":
  //         case "marketing":
  //         case "product":
  //         case "research":
  //         case "sales":
  //           return project.category === currFilter;
  //         default:
  //           return true;
  //       }
  //     })
  //   : null
  // ;


  // const sortedProjectsByName = projects
  // ? [...projects].sort((a, b) => {
  //     if (!sortNamesAsc) {
  //       return a.name.localeCompare(b.name); 
  //     } else {
  //       return b.name.localeCompare(a.name); 
  //     }
  //   })
  // : null;

  // const handleProjectSort = () => {
  //   if(sortProjectsDsc){
  //     const sortedUserByProjectCount = [...sortedUserDocuments].sort((a, b) => {
  //       const projectsA = projectDocuments.filter((projectDoc) =>
  //         projectDoc.assignedUsersList.some((userObj) => userObj.displayName === a.displayName)
  //       );
  //       const projectCountA = projectsA.length;
    
  //       const projectsB = projectDocuments.filter((projectDoc) =>
  //         projectDoc.assignedUsersList.some((userObj) => userObj.displayName === b.displayName)
  //       );
  //       const projectCountB = projectsB.length;
    
  //       return projectCountB - projectCountA; 
  //     });
    
  //     setSortedUserDocuments(sortedUserByProjectCount);
  //     setSortProjectsDsc(false)
  //   } else {
  //     const sortedUserByProjectCount = [...sortedUserDocuments].sort((a, b) => {
  //       const projectsA = projectDocuments.filter((projectDoc) =>
  //         projectDoc.assignedUsersList.some((userObj) => userObj.displayName === a.displayName)
  //       );
  //       const projectCountA = projectsA.length;
    
  //       const projectsB = projectDocuments.filter((projectDoc) =>
  //         projectDoc.assignedUsersList.some((userObj) => userObj.displayName === b.displayName)
  //       );
  //       const projectCountB = projectsB.length;
    
  //       return projectCountA - projectCountB; 
  //     });
    
  //     setSortedUserDocuments(sortedUserByProjectCount);
  //     setSortProjectsDsc(true)
  //   }
  // };