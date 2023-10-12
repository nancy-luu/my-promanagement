import React from 'react'
import Overview from './Overview'
import PriorityTasks from './PriorityTasksList'
import NewComments from './NewCommentsList'
import Collaborators from './Collaborators'


const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <Overview />
      <PriorityTasks />
      <NewComments />
      <Collaborators />
    </div>
  )
}

export default Dashboard
