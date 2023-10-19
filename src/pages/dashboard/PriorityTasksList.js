import { useMyProjects } from '../../hooks/useMyProjects';
import { Link } from 'react-router-dom'

// components
import PriorityTask from './PriorityTask';

// styles
import './PriorityTask.css'


const PriorityTasks = () => {
  const { inProgressProjects } = useMyProjects();

  const sortedProjects = [...inProgressProjects].sort((a, b) => a.dueDate - b.dueDate);
  const topProjects= sortedProjects.slice(0, 3);
  // console.log(sortedProjects.forEach(project => console.log(project.dueDate.toDate().toDateString())))


  return (
    <div className='prioritylist-container'>
      <h3>Priority</h3>
      <div className="task-container">
          {topProjects.map(project => (
            <Link to={`/projects/${project.id}`} key={project.id}>
              <div key={project.id}>
                <PriorityTask project={project}/>
              </div>
            </Link>
          ))}
      </div>
    </div>
  )
}

export default PriorityTasks
