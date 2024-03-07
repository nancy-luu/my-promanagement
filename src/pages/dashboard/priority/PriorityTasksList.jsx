import { useMyProjects } from '../../../hooks/useMyProjects';
import { Link } from 'react-router-dom'

// components
import PriorityTask from './PriorityTask';

// styles
import './PriorityTask.css'


const PriorityTasks = () => {
  const { myProjects } = useMyProjects();


  const excludesCompleteProjects = myProjects.filter((p) => p.isCompleted !== true);
  const sortedProjects = [...excludesCompleteProjects].sort((a, b) => a.dueDate - b.dueDate);
  const topProjects= sortedProjects.slice(0, 3);
  // console.log(sortedProjects.forEach(project => console.log(project.dueDate.toDate().toDateString())))


  return (
    <div className='grid-one-item grid-common grid-c1'>
      <h3>Priority</h3>
      <div className="task-container">
        {topProjects.length > 0 ? 
        (
          <>
            {topProjects.map(project => (
              <Link to={`/projects/${project.id}`} key={project.id}>
                <div key={project.id}>
                  <PriorityTask project={project}/>
                </div>
              </Link>
            ))}
          </>
        ):(
          <div className="nothing-to-display">
            <p>No projects to display</p>
            <Link to={"/createProject"}> yet!</Link>
          </div>
        )
        }
      </div>
    </div>
  )
}

export default PriorityTasks
