import React, { useState, useEffect } from 'react'
import { useCollection } from '../../hooks/useCollection'
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

  const { documents } = useCollection('users');
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if(documents) {
      const options = documents.map((user) => {
        return { value: user, label: user.displayName }
      })
      setUsers(options);
    }
  }, [documents])

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(name, details, dueDate, category.value, assignedUsers)
  }

  return (
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
            options={users}
            isMulti
          />
        </label>

        <button className="btn">Add</button>
      </form>
    </div>
  )
}
