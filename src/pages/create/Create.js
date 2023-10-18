import React, { useState, useEffect } from 'react'
import { useCollection } from '../../hooks/useCollection'
import { timestamp } from '../../firebase/config'
import { useAuthContext } from '../../hooks/useAuthContext'
import { useFirestore } from '../../hooks/useFirestore'
import { useHistory } from 'react-router-dom'
import Select from 'react-select'

//styles
import './Create.css'

const categories = [
  { value: 'development', label: 'Development' },
  { value: 'design', label: 'Design' },
  { value: 'marketing', label: 'Marketing' },
  { value: 'product', label: 'Product' },
  { value: 'research', label: 'Research' },
  { value: 'sales', label: 'Sales' }
]


export default function Create() {

  const [name, setName] = useState('');
  const [details, setDetails] = useState('')
  const [dueDate, setDueDate] = useState('')
  const [category, setCategory] = useState('')
  const [assignedUsers, setAssignedUsers] = useState([])
  const [isCompleted, setIsCompleted] = useState(false)
  const [formError, setFormError] = useState(null)

  const { documents } = useCollection('users');
  const [users, setUsers] = useState([]);
  const { user } = useAuthContext()

  // first time we save to projects if it doesnt exist it will be created 
  const { addDocument, response } = useFirestore('projects');
  const history = useHistory();

  useEffect(() => {
    if(documents) {
      const options = documents.map((user) => {
        return { value: user, label: user.displayName }
      })
      setUsers(options);
    }
  }, [documents])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setFormError(null)

    if(!category) {
      setFormError('Please select category.');
      return
    }
    if(assignedUsers.length < 1){
      setFormError('Please assign to at least 1 team member.')
    }

    const createdBy = {
      displayName: user.displayName,
      photoURL : user.photoURL,
      id: user.uid
    }

    // creating a simplified array of obects from useAuthContext with the properties we want
    const assignedUsersList = assignedUsers.map((u) => {
      return { 
        displayName: u.value.displayName,
        photoURL: u.value.photoURL,
        id: u.value.id
      }
    })

    const project = {
      name,
      details,
      category: category.value,
      dueDate: timestamp.fromDate(new Date(dueDate)),
      comments: [],
      createdBy,
      assignedUsersList,
      isCompleted: isCompleted
    }
    
    // waits to add document before moving on
    await addDocument(project);

    // if there is no response the user will be redirected the the dashboard
    if(!response.error) {
      console.log(response)
      history.push('/');
    }
  }

  console.log('\n')
  console.log(users)

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
            <span>Details:</span>
            <textarea 
              required
              type="text"
              onChange={(e) => setDetails(e.target.value)}
              value={details}
            ></textarea>
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
          <label>
            <span>Category:</span>
            <Select 
              options={categories}
              onChange={(option) => setCategory(option)}
            />
          </label>
          <label>
            <span>Assign to:</span>
            <Select
                onChange={(option) => setAssignedUsers(option)}
                // options={users}
                options={users.map((user) => ({
                  value: user.value.displayName,
                  label: (
                    <div className="select-option">
                      <img
                        src={user.value.photoURL}
                        alt={user.value.displayName}
                        className="avatar"
                      />
                      {user.value.displayName}
                    </div>
                  ),
                }))}
                isMulti
              />
          </label>

          <button className="btn">Add</button>

          {formError && <p className="error">{formError}</p>}
        </form>
      </div>
    </div>
  )
}
