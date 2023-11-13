import React, { useState, useEffect } from "react";
import { useCollection } from "../../hooks/useCollection";
import { timestamp } from "../../firebase/config";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useFirestore } from "../../hooks/useFirestore";
import { useHistory } from "react-router-dom";
import {categories} from "../../util/categories";
import { convertUTC } from "../../util/convertUTC";
import Select from "react-select";

//styles
import "./Create.css";


export default function Create() {
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

  // first time we save to projects if it doesnt exist it will be created
  const { addDocument, response } = useFirestore("projects");
  const history = useHistory();

  useEffect(() => {
    if (documents) {
      const options = documents.map((user) => {
        return { value: user, label: user.displayName, img: user.photoURL };
      });
      setUsers(options);
    }
  }, [documents]);


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

    // waits to add document before moving on
    await addDocument(project);

    // if there is no response the user will be redirected the the dashboard
    if (!response.error) {
      console.log("this is the response id: " + response.id);
      console.log(dueDate)
      history.push(`/projects`);
    }
  };

  console.log("\n");
  console.log(users);

  return (
    <div className="create-container">
      <div className="create-form">
        <h2 className="page-title">Start a new Project:</h2>
        <form onSubmit={handleSubmit}>
          <label>
            <span>Name:</span>
            <input
              required
              type="text"
              onChange={(e) => setName(e.target.value)}
              value={name}
            ></input>
          </label>
          <label>
            <span>Due Date:</span>
            <input
              required
              type="date"
              onChange={(e) => setDueDate(e.target.value)}
              value={dueDate}
            ></input>
          </label>
          <div className="category-assign-container">
            <label>
              <span>Category:</span>
              <Select
                className="category-select"
                options={categories}
                onChange={(option) => setCategory(option)}
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
              />
            </label>
            <label>
              <span>Assign to:</span>
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
              />
            </label>
          </div>
          <label>
            <span>Details:</span>
            <textarea
              required
              type="text"
              onChange={(e) => setDetails(e.target.value)}
              value={details}
            ></textarea>
          </label>

          <button className="btn">Add</button>

          {formError && <p className="error">{formError}</p>}
        </form>
      </div>
    </div>
  );
}
