import { useState, useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import { useDocument } from "../../hooks/useDocument";
import { useCollection } from "../../hooks/useCollection";
import { useUsersProjects } from "../../hooks/useUsersProjects";
import { tableImgs } from "../../util/images";


// components
import Avatar from "../../components/Avatar";
import ProjectInfo from "../projects_board/ProjectInfo";

// style and images
import "../team_board/Team.css";

const UserProfile = () => {
  const { id } = useParams();
  const { error: userError, document: user } = useDocument("users", id);
  const { error, documents: projects } = useCollection("projects");
  const { projectCount, openProjects, inProgressProjects, completedProjects } =
    useUsersProjects(user);

  const [sortedProjectDocs, setSortedProjectDocs] = useState([]);
  const [sortNamesAsc, setSortNamesAsc] = useState(false);
  const [sortStatus, setSortStatus] = useState(false);
  const [sortDateDsc, setSortDateDsc] = useState(false);
  const [sortOwnerAsc, setSortOwnerAsc] = useState(false);
  const [sortDepartmentAsc, setSortDepartmentAsc] = useState(false);

  const usersProjects = useMemo(() => {
    return projects
      ? projects.filter((projectDoc) =>
          projectDoc.assignedUsersList.some((userObj) => userObj.id === id)
        )
      : [];
  }, [projects, id]);

  useEffect(() => {
    setSortedProjectDocs(usersProjects);
  }, [usersProjects]);

  if (userError) {
    return <div className="error">{userError}</div>;
  }
  if (!user) {
    return <div className="loading">Loading...</div>;
  }

  const handleProjectNameSort = () => {
    if (!sortNamesAsc) {
      const sortedProjectNamesAsc = [...sortedProjectDocs].sort((a, b) => {
        if (a.name < b.name) {
          return -1;
        }
        if (a.name > b.name) {
          return 1;
        }
        return 0;
      });
      setSortedProjectDocs(sortedProjectNamesAsc);
      setSortNamesAsc(true);
    } else {
      const sortedProjectNamesDsc = [...sortedProjectDocs].sort((a, b) => {
        if (a.name > b.name) {
          return -1;
        }
        if (a.name < b.name) {
          return 1;
        }
        return 0;
      });
      setSortedProjectDocs(sortedProjectNamesDsc);
      setSortNamesAsc(false);
    }
  };

  const handleProjectStatusSort = () => {
    if (!sortStatus) {
      const sortOpenInProgressClosed = [...sortedProjectDocs].sort((a, b) => {
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
      setSortedProjectDocs(sortOpenInProgressClosed);
      console.log("Sorted proejcts in status" + sortedProjectDocs);
      setSortStatus(true);
    } else {
      const sortClosedInProgressOpen = [...sortedProjectDocs].sort((a, b) => {
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
      setSortedProjectDocs(sortClosedInProgressOpen);
      setSortStatus(false);
    }
  };

  const handleProjectDateSort = () => {
    if (!sortDateDsc) {
      const projectSortedDsc = [...sortedProjectDocs].sort((a, b) => {
        if (a.dueDate > b.dueDate) {
          return -1;
        }
        if (a.dueDate < b.dueDate) {
          return 1;
        }
        return 0;
      });
      setSortedProjectDocs(projectSortedDsc);
      setSortDateDsc(true);
    } else {
      const projectSortAsc = [...sortedProjectDocs].sort((a, b) => {
        if (a.dueDate < b.dueDate) {
          return -1;
        }
        if (a.dueDate > b.dueDate) {
          return 1;
        }
        return 0;
      });
      setSortedProjectDocs(projectSortAsc);
      setSortDateDsc(false);
    }
  };

  const handleProjectOwnerSort = () => {
    if (!sortOwnerAsc) {
      const projectOwnersAsc = [...sortedProjectDocs].sort((a, b) => {
        if (a.createdBy.displayName < b.createdBy.displayName) {
          return -1;
        }
        if (a.createdBy.displayName > b.createdBy.displayName) {
          return 1;
        }
        return 0;
      });
      setSortedProjectDocs(projectOwnersAsc);
      setSortOwnerAsc(true);
    } else {
      const projectOwnersDsc = [...sortedProjectDocs].sort((a, b) => {
        if (a.createdBy.displayName > b.createdBy.displayName) {
          return -1;
        }
        if (a.createdBy.displayName < b.createdBy.displayName) {
          return 1;
        }
        return 0;
      });
      setSortedProjectDocs(projectOwnersDsc);
      setSortOwnerAsc(false);
    }
  };

  const handleProjectDepartmentSort = () => {
    if (!sortDepartmentAsc) {
      const projectDepartmentAsc = [...sortedProjectDocs].sort((a, b) => {
        if (a.category < b.category) {
          return -1;
        }
        if (a.category > b.category) {
          return 1;
        }
        return 0;
      });
      setSortedProjectDocs(projectDepartmentAsc);
      setSortDepartmentAsc(true);
    } else {
      const projectDepartmentDsc = [...sortedProjectDocs].sort((a, b) => {
        if (a.category > b.category) {
          return -1;
        }
        if (a.category < b.category) {
          return 1;
        }
        return 0;
      });
      setSortedProjectDocs(projectDepartmentDsc);
      setSortDepartmentAsc(false);
    }
  };

  return (
    <div>
      {user && (
        <div className="user-profile-container">
          <div className="users-project-wrapper">
            <div className="users-project-container">
              {usersProjects && usersProjects.length === 0 ? (
                <p>*No projects to display*</p>
              ) : (
                <div className="user-container">
                   <Avatar src={user.photoURL} />
                  <h3>{user.displayName}'s Projects</h3>
                </div>
              )}
              <table className="project-table">
                <colgroup>
                  <col style={{ width: "25%" }} />{" "}
                  {/* Adjust width as needed */}
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
                        src={tableImgs.sortIcon}
                        alt="sort icon"
                        onClick={handleProjectNameSort}
                      />
                    </div>
                  </th>
                  <th>
                    <div className="header-segment">
                      Status
                      <img
                        className="sort-icon"
                        src={tableImgs.sortIcon}
                        alt="sort icon"
                        onClick={handleProjectStatusSort}
                      />
                    </div>
                  </th>
                  <th>
                    <div className="header-segment">
                      Due Date
                      <img
                        className="sort-icon"
                        src={tableImgs.sortIcon}
                        alt="sort icon"
                        onClick={handleProjectDateSort}
                      />
                    </div>
                  </th>
                  <th>
                    <div className="header-segment">
                      Owner
                      <img
                        className="sort-icon"
                        src={tableImgs.sortIcon}
                        alt="sort icon"
                        onClick={handleProjectOwnerSort}
                      />
                    </div>
                  </th>
                  <th>Team</th>
                  <th>
                    <div className="header-segment">
                      Owner
                      <img
                        className="sort-icon"
                        src={tableImgs.sortIcon}
                        alt="sort icon"
                        onClick={handleProjectDepartmentSort}
                      />
                    </div>
                  </th>
                </tr>
                <tbody>
                  {error && <p className="error">{error}</p>}
                  {sortedProjectDocs &&
                    sortedProjectDocs.map((project) => (
                      <ProjectInfo project={project} />
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
