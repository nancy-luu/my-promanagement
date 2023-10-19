import { useState } from "react";
import { useCollection } from "../../hooks/useCollection";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useMyProjects } from '../../hooks/useMyProjects';


const ProjectsStats = () => {
    const { myProjects, openProjects, inProgressProjects, completedProject, projectCount } = useMyProjects();
    const { user } = useAuthContext();

    console.log('MY PROJECTS -------------')

    let openPercent = (openProjects.length / projectCount) * 100;
    let inProgressPercent = (inProgressProjects.length / projectCount) * 100;
    let completedPercent = (completedProject.length / projectCount) * 100;

  return (
    <div className="status-container">
      <h3>Status</h3>
      <h4>Open:</h4>
      <div>{openPercent}%</div>
      <h4>In Progress:</h4>
      <div>{inProgressPercent}%</div>
      <h4>Completed:</h4>
      <div>{completedPercent}%</div>
    </div>
  )
}

export default ProjectsStats
