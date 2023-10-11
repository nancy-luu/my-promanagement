import { useAuthContext } from '../../hooks/useAuthContext'
import { useCollection } from '../../hooks/useCollection'
import { useMyProjects } from '../../hooks/useMyProjects';


// styles
import './Overview.css'

const Overview = () => {    
    const { myProjects } = useMyProjects();
    // console.log(myProjects)
    
    const projectCount = myProjects.length;
    const completedProject = myProjects.filter(project => project.isCompleted)
    const inProgressProjects = myProjects.filter(project => project.comments && project.comments.length > 0);


  return (
    <div className="overview-container">
        <div className="total-stack">
            <h3>Total Projects</h3>
            <h1>{projectCount ? projectCount : '-'}</h1>
        </div>
        <div className="completed-stack">
            <h3>Completed</h3>
            <h1>{completedProject.length ? completedProject.length : '-'}</h1>
        </div>
        <div className="progress-stack">
            <h3>In Progress</h3>
            <h1>{inProgressProjects.length ? inProgressProjects.length : '-'}</h1>
        </div>
    </div>
  )
}

export default Overview
