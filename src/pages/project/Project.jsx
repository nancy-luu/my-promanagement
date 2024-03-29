import { useParams } from 'react-router-dom'
import { useDocument } from '../../hooks/useDocument'
import { useAuthContext } from "../../hooks/useAuthContext";


// components
import ProjectSummary from './ProjectSummary';
import ProjectComments from './ProjectComments';

//styles
import './Project.css';


export default function Project() {
  const { id } = useParams();
  const { error, document } = useDocument('projects', id)
  const { user } = useAuthContext(); 

  if (error){
    return <div className="error">{error}</div>
  }
  if (!document){
    return <div className="loading">Loading...</div>
  }

  return (
    <div className="project-details">
      <ProjectSummary  project={document} />
      <ProjectComments project={document} />
    </div>
  )
}
 