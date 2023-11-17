import { useState, useEffect } from "react";
import { useCollection } from "../hooks/useCollection";
import { useAuthContext } from "../hooks/useAuthContext";
import { useFirestore } from "../hooks/useFirestore";
import { categories } from "../util/categories";
import { timestamp } from "../firebase/config";
import { useHistory } from "react-router-dom";
import { convertUTC } from "../util/convertUTC";
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
    const nextDay = new Date(formattedDate);
    nextDay.setDate(formattedDate.getDate() + 1);
    const day = String(nextDay.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };
  const formattedDueDate = formatDate(convertedDueDate);

  // Formating category to read with Capitalization
  const formattedCategory =
    [...project.category][0].toUpperCase() +
    [...project.category].slice(1).join("");

  // states
  const [appear, setAppear] = useState(false);
  const [name, setName] = useState(project.name);
  const [details, setDetails] = useState(project.details);
  const [dueDate, setDueDate] = useState(formattedDueDate);
  const [category, setCategory] = useState(formattedCategory);
  const [assignedUsers, setAssignedUsers] = useState(project.assignedUsersList);
  const [formError, setFormError] = useState(null);
  const [users, setUsers] = useState([]);

  const { documents } = useCollection("users");
  const { user } = useAuthContext();
  const { updateDocumentSummary, response } = useFirestore("projects");
  const history = useHistory();

  
  // formatting for Assigned User Select Options
  useEffect(() => {
    if (documents) {
      const options = documents.map((user) => {
        return { value: user, label: user.displayName, img: user.photoURL };
      });

      const filteredOptions = options.filter((option) => {
        return !assignedUsers.some((selectedUser) =>
          selectedUser.value.id === option.value.id
        );
      });
  
      setUsers(filteredOptions);
    }

  }, [documents, assignedUsers]);

  //   formatting for Assigned User Select Default State
  useEffect(() => {
    if (project) {
      const formattedAssignedUsers = project.assignedUsersList.map((user) => {
        return { value: user, label: user.displayName, img: user.photoURL };
      });
      setAssignedUsers(formattedAssignedUsers);
    }
  }, [project]);

  const toggleModal = () => {
    setAppear(!appear);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setFormError(null);
  
    try {
      if (!category) {
        setFormError("Please select category.");
        return;
      }
      if (assignedUsers.length === 0) {
        setFormError("Please assign to at least 1 team member.");
        return;
      }
  
      // creating a simplified array of objects from useAuthContext with the following properties
      const assignedUsersList = assignedUsers.map((u) => {
        return {
          displayName: u.value.displayName,
          photoURL: u.value.photoURL,
          id: u.value.id,
        };
      });
  
      const updateResult = await updateDocumentSummary(project.id, {
        name,
        details,
        category: category.value,
        dueDate: timestamp.fromDate(convertUTC(new Date(dueDate))),
        assignedUsersList: assignedUsersList,
      });
  
      // Check the update result
      if (updateResult && updateResult.error) {
        // Handle the case where there's an error in the update result
        console.error("Error updating document:", updateResult.error);
        setFormError("An error occurred while updating the document.");
      } else {
        // Success case
        console.log("Update successful");
        setAppear(false);
        console.log("\n");
        console.log(
          "Project due date from update: " + project.dueDate.toDate().toString()
        );
        console.log("\n");
        history.push(`/projects/${project.id}`);
      }
    } catch (error) {
      // Handle other potential errors that may occur
      console.error("An unexpected error occurred:", error);
      setFormError("An unexpected error occurred.");
    }
  
    console.log("\n");
    console.log(assignedUsers);
    //   console.log(assignedUsers.forEach(user => console.log(user.value)))
    console.log("\n");
  };
  


  return (
    <>
      <button className="btn" onClick={toggleModal}>
        Edit
      </button>

      <div className={`modal ${appear ? "active" : ""}`}>
        <div className="modal-content">
          <div className="update-form">
            <h2 className="page-title">Update Project:</h2>
            <form onSubmit={handleSave}>
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
                <p>Details:</p>
                <textarea
                  required
                  type="text"
                  onChange={(e) => setDetails(e.target.value)}
                  value={details}
                ></textarea>
              </label>
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
                <p>Due Date:</p>
                <input
                  required
                  type="date"
                  onChange={(e) => setDueDate(e.target.value)}
                  value={dueDate}
                ></input>
              </label>
              <div className="category-assign-container">
                <label>
                  <p>Assign to:</p>
                  <Select
                    isMulti
                    value={assignedUsers}
                    onChange={(option) => setAssignedUsers(option)}
                    options={users}
                    formatOptionLabel={(user) => (
                      <div className="assigned-user-option">
                        <img
                          src={user.img}
                          className="avatar"
                          alt="user-avatar"
                        />
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

              <div className="btn-group">
                <button className="btn" onClick={toggleModal}>
                  Discard
                </button>
                <button className="btn">Save</button>
              </div>

              {formError && <p className="error">{formError}</p>}
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateModal;
