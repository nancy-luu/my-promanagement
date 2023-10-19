import { useProjectStats } from '../../hooks/useProjectStats';


const ProjectsStats = ({ currFilter, setCurrFilter, changeFilter, projects, error, documents }) => {
    const { openPercent, inProgressPercent, completedPercent } = useProjectStats(projects);

  return (
    <div className="status-container">
      <h3>Status of {currFilter}</h3>
      <h4>Open:</h4>
      <p>{openPercent}%</p>
      <h4>In Progress:</h4>
      <p>{inProgressPercent}%</p>
      <h4>Completed:</h4>
      <p>{completedPercent}%</p>
    </div>
  )
}

export default ProjectsStats