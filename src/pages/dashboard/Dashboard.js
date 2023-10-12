import React from 'react'
import Overview from './Overview'
import PriorityTasks from './PriorityTasksList'
import NewComments from './NewCommentsList'


const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <Overview />
      <PriorityTasks />
      <NewComments />
    </div>
  )
}

export default Dashboard
