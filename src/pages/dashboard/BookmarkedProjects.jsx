import { useState, useEffect } from "react";
import { dashboardImgs } from "../../util/images";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useDocument } from "../../hooks/useDocument";
import { useFirestore } from "../../hooks/useFirestore";
import { Link } from "react-router-dom";

//styles
import "./Bookmark.css";

export default function BookmarkedProjects({ myProjects }) {
  const { user, authIsReady } = useAuthContext();
  const { error: userError, document: userData } = useDocument( "users", user.uid );
  const { updateUserBookmarks } = useFirestore("users");

  const [appear, setAppear] = useState(false);
  const [checkedProjects, setCheckedProjects] = useState([]);
  const [bookmarkedIds, setBookmarkedIds] = useState([]);
  const [bookmarkedProjectsList, setBookmarkedMarkedProjectsList] = useState(
    []
  );
 
  useEffect(() => {
    if (userData && userData.bookmarkedProjects) {
      setBookmarkedIds(userData.bookmarkedProjects);
      const bookmarked = myProjects.filter((project) =>
        userData.bookmarkedProjects.includes(project.id)
      );

      setBookmarkedMarkedProjectsList(bookmarked);
    }
  }, [myProjects, userData]);

  const toggleModal = () => {
    setAppear(!appear);
  };

  const handleCheckboxChange = (projectId) => {
    setCheckedProjects((prevCheckedProjects) => {
      if (prevCheckedProjects.includes(projectId)) {
        // If the project is already checked, remove it
        return prevCheckedProjects.filter((id) => id !== projectId);
      } else {
        // If the project is not checked and the length is less than 3, add it
        if (prevCheckedProjects.length < 3) {
          return [...prevCheckedProjects, projectId];
        }
        return prevCheckedProjects;
      }
    });
  };

  const handleSaveBookmarks = async () => {
    setBookmarkedIds(checkedProjects);

    try {
      const response = await updateUserBookmarks(user.uid, {
        bookmarkedProjects: bookmarkedIds,
      });

      if (response && response.error) {
        console.log("Failed to update: " + response.error);
      } else {
        toggleModal();
      }
    } catch (error) {
      console.log("Error occurred while updating bookmarks: " + error);
    }
  };

  return (
    <div className="subgrid-two-item grid-common grid-c1">
      <div className="modal-header">
        <h4>Bookmarked Projects</h4>
        <img
          className="add-bookmark-btn"
          src={dashboardImgs.add}
          alt="Add btn"
          onClick={toggleModal}
        />
      </div>

      <div className="fav-projects">
        <div className="bookmark-links-wrapper">
          {bookmarkedProjectsList &&
            bookmarkedProjectsList.map((p) => 
            <div key={p.id} className="bookmark-link">
              <Link to={`/projects/${p.id}`}
              >{p.name}</Link>
            </div>
          )}
        </div>

        <div className={`modal ${appear ? "active" : ""}`}>
          <div className="modal-content">
            <div className="modal-header">
              <h4>Choose 3 projects:</h4>
            </div>
            <div className="modal-body">
              {myProjects.map((project) => (
                <div className="bookmark-container">
                  <input
                    type="checkbox"
                    checked={checkedProjects.includes(project.id)}
                    onChange={() => handleCheckboxChange(project.id)}
                  />
                  <p>{project.name}</p>
                </div>
              ))}
              <div className="modal-button-wrapper">
                <button className="btn" onClick={handleSaveBookmarks}>
                  Save
                </button>
                <button className="btn" onClick={toggleModal}>
                  X
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
