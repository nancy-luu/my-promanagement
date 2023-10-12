import React from 'react'


// styles
import './PriorityTask.css'

const PriorityTask = ({ project }) => {

  return (
    <div className="task-form">
        <div>{project.name}</div>
        <div>Due Date: {project.dueDate.toDate().toDateString()}</div>
    </div>
  )
}

export default PriorityTask
