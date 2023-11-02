import { useMyProjects } from "../../hooks/useMyProjects";

// components
import Overview from './Overview'
import SmallCalendar from './SmallCalendar'
import PriorityTasks from './PriorityTasksList'
import NewCommentsList from './NewCommentsList'
import Collaborators from './Collaborators'

// styles
import './Dashboard.css'

const Dashboard = () => {
  const { myProjects } = useMyProjects();

  return (
    <div className="dashboard-container">
      <div className="dashboard-left">
        <Overview /> 
        <SmallCalendar />
      </div>
      <div className="dashboard-right">
        <div className="dashboard-right-top">
          <PriorityTasks />
        </div>
        <div className="dashboard-right-bottom">
          <NewCommentsList projects={myProjects}/>
          <Collaborators />
        </div>
      </div>
    </div>
  )
}

export default Dashboard
