import { useState } from "react";
import { useAuthContext } from '../../../hooks/useAuthContext'
import { useCollection } from '../../../hooks/useCollection'
import { useMyProjects } from '../../../hooks/useMyProjects';

// styles
import './Overview.css'

const Overview = () => {    
    const { openProjects, completedProject, inProgressProjects, projectCount, myProjects } = useMyProjects();
    const [openModal, setOpenModal] = useState(false);
    
  return (
    <div className="grid-one-item grid-common grid-c1">
        <div className="overview-container">
            <div className="completed-stack">
                <h4>Completed</h4>
                <h1>{completedProject.length ? completedProject.length : '-'}</h1>
            </div>
            <div className="progress-stack">
                <h4>In Progress</h4>
                <h1>{inProgressProjects.length ? inProgressProjects.length : '-'}</h1>
            </div>
            <div className="total-stack">
                <h4>Open</h4>
                <h1>{openProjects.length ? openProjects.length : '-'}</h1>
            </div>
        </div>
    </div>
  )
} 

export default Overview
