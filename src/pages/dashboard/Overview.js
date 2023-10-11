import { useAuthContext } from '../../hooks/useAuthContext'
import { useCollection } from '../../hooks/useCollection'
import { useMyProjects } from '../../hooks/useMyProjects';


// styles
import './Overview.css'

const Overview = () => {
    const { user } = useAuthContext();
    const { error: projectError, documents: projectDocuments } = useCollection('projects')
    
    const { myProjects } = useMyProjects();


  return (
    <div className="overview-container">
        <div className="total-stack">
            <h3>Total Projects</h3>
            <h1>15</h1>
        </div>
        <div className="completed-stack">
            <h3>Completed</h3>
            <h1>8</h1>
        </div>
        <div className="progress-stack">
            <h3>In Progress</h3>
            <h1>11</h1>
        </div>
    </div>
  )
}

export default Overview
