import { useState, useEffect } from "react";
import { useCollection } from "../hooks/useCollection";
import { useAuthContext } from "../hooks/useAuthContext";
import { categories } from "../util/categories";
import { timestamp } from "../firebase/config";

import Select from "react-select";

//styles
import "./UpdateModal.css";

const UpdateModal = ({ project }) => {
    const dueDateTimestamp = project.dueDate;
    const convertedDueDate = dueDateTimestamp.toDate();  

  // Function to format the date as "YYYY-MM-DD"
  const formatDate = (date) => {
    if (!date) return ""; // Handle case where dueDate is not defined
    const formattedDate = new Date(date);
    const year = formattedDate.getFullYear();
    const month = String(formattedDate.getMonth() + 1).padStart(2, "0");
    const day = String(formattedDate.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const formattedDueDate = formatDate(convertedDueDate);

  // states
  const [appear, setAppear] = useState(false);
  const [name, setName] = useState(project.name);
  const [details, setDetails] = useState(project.details);
  const [dueDate, setDueDate] = useState(formattedDueDate);
  const [category, setCategory] = useState(project.category);
  const [assignedUsers, setAssignedUsers] = useState([]);
  const [isCompleted, setIsCompleted] = useState(project.isCompleted);
  const [formError, setFormError] = useState(null);
  const [users, setUsers] = useState([]);

  const { documents } = useCollection("users");
  const { user } = useAuthContext();

  useEffect(() => {
    if (documents) {
      const options = documents.map((user) => {
        return { value: user, label: user.displayName, img: user.photoURL };
      });
      setUsers(options);
    }
  }, [documents]);

  useEffect(() => {
    if(project) {
        const formattedAssignedUsers = project.assignedUsersList.map((user) => {
            return { value: user, label: user.displayName, img: user.photoURL };
        })
        setAssignedUsers(formattedAssignedUsers);
    }
  }, [project])

  const toggleModal = () => {
    setAppear(!appear);
  };

  //   const handleUpdate = (e) => {};

  console.log(project);
  console.log(dueDate);

  return (
    <>
      <button className="btn" onClick={toggleModal}>
        Edit
      </button>

      <div className={`modal ${appear ? "active" : ""}`}>
        <div className="modal-content">
          <div className="update-form">
            <h2 className="page-title">Update Project:</h2>
            <form>
              <label>
                <p>Name:</p>
                <input
                  required
                  type="text"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                ></input>
              </label>
              <label>
                <p>Due Date:</p>
                <input
                  required
                  type="date"
                  onChange={(e) => setDueDate(e.target.value)}
                  value={dueDate}
                ></input>
              </label>
            </form>
          </div>
          <div className="category-assign-container">
            <label>
              <p>Category:</p>
              <Select
                className="category-select"
                value={category}
                options={categories}
                onChange={(option) => setCategory(option)}
                // select customize only here - not in css
                theme={(theme) => ({
                  ...theme,
                  borderRadius: "5px",
                  colors: {
                    ...theme.colors,
                    text: "orange",
                    primary25: "orange",
                    primary: "orange",
                  },
                })}
                placeholder={category}
              />
            </label>
            <label>
              <p>Assign to:</p>
              <Select
                isMulti
                value={assignedUsers}
                onChange={(option) => setAssignedUsers(option)}
                options={users}
                formatOptionLabel={(user) => (
                  <div className="assigned-user-option">
                    <img src={user.img} className="avatar" alt="user-avatar" />
                    <p>{user.label}</p>
                  </div>
                )}
                // select customize only here - not in css
                theme={(theme) => ({
                  ...theme,
                  borderRadius: "5px",
                  colors: {
                    ...theme.colors,
                    text: "orange",
                    primary25: "orange",
                    primary: "orange",
                  },
                })}
              />
            </label>
          </div>
          <label>
            <p>Details:</p>
            <textarea
              required
              type="text"
              onChange={(e) => setDetails(e.target.value)}
              value={details}
            ></textarea>
          </label>
          <div className="btn-group">
            <button className="btn" onClick={toggleModal}>
              Discard
            </button>
            <button className="btn">Save</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateModal;
