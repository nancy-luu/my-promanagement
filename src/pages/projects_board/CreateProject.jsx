import { useState, useEffect } from "react";
import { useCollection } from "../../hooks/useCollection";
import { timestamp } from "../../firebase/config";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useFirestore } from "../../hooks/useFirestore";
import { useHistory } from "react-router-dom";
import {categories} from "../../util/categories";
import { convertUTC } from "../../util/convertUTC";
import Select from "react-select";

//styles
import "./CreateProject.css";

 
export default function CreateProject() {
  const [name, setName] = useState("");
  const [details, setDetails] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [category, setCategory] = useState("");
  const [assignedUsers, setAssignedUsers] = useState([]);
  const [isCompleted, setIsCompleted] = useState(false);
  const [formError, setFormError] = useState(null);
  const [users, setUsers] = useState([]);

  const { documents } = useCollection("users");
  const { user } = useAuthContext();

  const { addDocument, response, getDocumentId } = useFirestore("projects");
  const history = useHistory();


  useEffect(() => {
    if (documents) {
      const options = documents.map((user) => {
        return { value: user, label: user.displayName, img: user.photoURL };
      });
      setUsers(options);
    }
  }, [documents]);

  useEffect(() => {
    if (response.documentId && !response.error) {
      console.log("Document ID:", response.documentId);
      history.push(`/projects/${response.documentId}`);
    }
  }, [response.documentId, response.error, history]);
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError(null);

    if (!category) {
      setFormError("Please select category.");
      return;
    }
    if (assignedUsers.length < 1) {
      setFormError("Please assign to at least 1 team member.");
    }

    const createdBy = {
      displayName: user.displayName,
      photoURL: user.photoURL,
      id: user.uid,
    };

    // creating a simplified array of obects from useAuthContext with the properties we want
    const assignedUsersList = assignedUsers.map((u) => {
      return {
        displayName: u.value.displayName,
        photoURL: u.value.photoURL,
        id: u.value.id,
      };
    });

    const project = {
      name,
      details,
      category: category.value,
      dueDate: timestamp.fromDate(convertUTC(new Date(dueDate))),
      comments: [],
      createdBy,
      assignedUsersList,
      isCompleted: isCompleted,
    };

    try {
      await addDocument(project);
    } catch (error) {
      console.error("Error adding document:", error);
      setFormError("An error occurred while adding the document.");
    }
  };

  return (
    <div className="create-project-wrapper">
      <div className="create-form grid-common">
        <h2 className="page-title">Start New Project:</h2>
        <form onSubmit={handleSubmit}>
          <label>
            <input
              required
              placeholder="Name"
              type="text"
              onChange={(e) => setName(e.target.value)}
              value={name}
            ></input>
          </label>
          <div className="category-assign-container">
          <label>
            <input
              className="date-input"
              required
              placeholder="Due Date"
              type="date"
              onChange={(e) => setDueDate(e.target.value)}
              value={dueDate}
            ></input>
          </label>
            <label>
              <Select
                className="category-select"
                options={categories}
                onChange={(option) => setCategory(option)}
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
                placeholder="Category"
              />
            </label>
          </div>
            <label>
              <Select
                isMulti
                value={assignedUsers}
                onChange={(option) => setAssignedUsers(option)}
                options={users}
                formatOptionLabel={user => (
                  <div className="assigned-user-option">
                    <img src={user.img} className="avatar" alt="user-avatar" />
                    <p>{user.label}</p>
                  </div>
                )}
                // select customize only here - not in css 
                theme={(theme) => ({
                  ...theme,
                  borderRadius: '5px',
                  colors: {
                  ...theme.colors,
                    text: 'orange',
                    primary25: 'orange',
                    primary: 'orange',
                  },
                })}
                placeholder="Assign To"
              />
            </label>
          <label>
            <textarea
              required
              type="text"
              onChange={(e) => setDetails(e.target.value)}
              value={details}
              placeholder="Detail"
            ></textarea>
          </label>

          <button className="btn">Add</button>

          {formError && <p className="error">{formError}</p>}
        </form>
      </div>
    </div>
  );
}
