import { Link } from 'react-router-dom'

// components
import NewComment from "./NewComment";
  
// styles
import './NewComment.css' 

const NewCommentsList = ({ projects }) => {

  const inProgressProjects = projects ? projects.filter(
    (project) => project.comments.length > 0
  ) : []

  let allComments = [];

  inProgressProjects.forEach((project) => {
    const newComment = project.comments.map((comment) => ({ ...comment, projectId: project.id }));
    allComments.push(newComment);
  });

  let sortedComments = allComments.flat().sort((a, b) => b.createdAt - a.createdAt).slice(0, 3);
  
  return (
    <div className="grid-common grid-one-item grid-c1">
      <h3>New Comments</h3>
      {sortedComments.length > 0 ? (
        <>
          {sortedComments.map(comment => (
            <Link to={`/projects/${comment.projectId}`} key={comment.id}>
              <NewComment key={comment.createdAt} comment={comment} projects={projects}/>
            </Link>
          ))}
        </>
        ):(
        <>
          <div className="nothing-to-display">
            <p>No new comments to display</p>
            <Link to={"/createProject"}> yet!</Link>
          </div>
        </>
      )}
    </div>
  );
};

export default NewCommentsList;
