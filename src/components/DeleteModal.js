import { useState } from 'react'
import { useFirestore } from '../hooks/useFirestore'
import { useHistory } from 'react-router-dom'
import { meetingImgs } from "../util/images";


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
          <img src={meetingImgs.trash} className="btn delete-icon" onClick={toggleModal}/>

          <div className={`modal ${appear ? 'active' : ''}`}>
              <div className="modal-content">
                  <p>Are you sure you want to delete this project?</p>
                  <div className="modal-btn-group">  
                    <button className="btn" onClick={toggleModal}>Cancel</button>
                    <button className="btn" onClick={handleDelete}>Yes</button>
                  </div>
              </div>
          </div>
      </>
  )
}


export default DeleteModal
