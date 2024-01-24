import { Link } from 'react-router-dom'

// components
import NewComment from "./NewComment";

// styles
import './NewComment.css' 

const NewCommentsList = ({ projects }) => {

  // console.log(projects);

  const inProgressProjects = projects ? projects.filter(
    (project) => project.comments.length > 0
  ) : []

  console.log(inProgressProjects);


  let allComments = [];

  inProgressProjects.forEach((project) => {
    const newComment = project.comments.map((comment) => ({ ...comment, projectId: project.id }));
    allComments.push(newComment);
    console.log("NEW COMMENT")
    console.log(newComment)
  });

  let sortedComments = allComments.flat().sort((a, b) => b.createdAt - a.createdAt).slice(0, 3);
  
  console.log("SORTED COMMENTS")
  console.log(sortedComments);

  return (
    <div className="grid-one-item grid-common grid-c1">
      <h3>New Comments</h3>
      {/* {sortedComments.length <= 0 && <p>No new comments to display</p>} */}
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
