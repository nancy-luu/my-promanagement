import { useState } from 'react'
import { useFirestore } from '../hooks/useFirestore'
import { useHistory } from 'react-router-dom'

//styles
import "./DeleteModal.css"

const DeleteModal = ({ project }) => {
  const { deleteDocument } = useFirestore('projects');
  const history = useHistory();

  const [appear, setAppear] = useState(false);

  const toggleModal = () => {
      setAppear(!appear);
  }

  const handleDelete = (e) => {
      deleteDocument(project.id);
      history.push('/projects');
  }

  return (
      <>
          <button className="btn" onClick={toggleModal}>X</button>

          <div className={`modal ${appear ? 'active' : ''}`}>
              <div className="modal-content">
                  <p>Are you sure you want to delete this project?</p>
                  <div className="btn-group">  
                    <button className="btn" onClick={toggleModal}>Cancel</button>
                    <button className="btn" onClick={handleDelete}>Delete</button>
                  </div>
              </div>
          </div>
      </>
  )
}


export default DeleteModal
