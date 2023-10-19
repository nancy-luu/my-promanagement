import { useAuthContext } from '../../hooks/useAuthContext'
import { useCollection } from '../../hooks/useCollection'
import { useMyProjects } from '../../hooks/useMyProjects';


// styles
import './Overview.css'

const Overview = () => {    
    const { completedProject, inProgressProjects, projectCount } = useMyProjects();
    
  return (
    <div className="overview-container">
        <div className="total-stack">
            <h4>Total Projects</h4>
            <h1>{projectCount ? projectCount : '-'}</h1>
        </div>
        <div className="progress-stack">
            <h4>In Progress</h4>
            <h1>{inProgressProjects.length ? inProgressProjects.length : '-'}</h1>
        </div>
        <div className="completed-stack">
            <h4>Completed</h4>
            <h1>{completedProject.length ? completedProject.length : '-'}</h1>
        </div>
    </div>
  )
}

export default Overview
