import { useState } from "react";
import { dashboardImgs } from "../../util/images";

//styles
import "./Bookmark.css";

export default function BookmarkModal({ myProjects }) {
  const [appear, setAppear] = useState(false);
  const [checkedProjects, setCheckedProjects] = useState([]);

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

  return (
    <>
      <img
        className="add-bookmark-btn"
        src={dashboardImgs.add}
        alt="Add btn"
        onClick={toggleModal}
      />

      <div className={`modal ${appear ? "active" : ""}`}>
        <div className="modal-content">
          <div className="modal-header">
            <h4>Choose 3 projects:</h4>
            <button className="btn" onClick={toggleModal}>
              X
            </button>
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
          </div>
        </div>
      </div>
    </>
  );
}
