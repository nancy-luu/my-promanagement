import React from 'react'
import Overview from './Overview'
import PriorityTasks from './PriorityTasksList'
import NewComments from './NewCommentsList'
import Collaborators from './Collaborators'

// styles
import './Dashboard.css'

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <div className="dashboard-left">
        <Overview /> 
      </div>
      <div className="dashboard-right">
        <div className="dashboard-right-top">
          <PriorityTasks />
        </div>
        <div className="dashboard-right-bottom">
          <NewComments />
          <Collaborators />
        </div>
      </div>
    </div>
  )
}

export default Dashboard
