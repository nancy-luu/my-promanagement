import { useMyProjects } from "../../hooks/useMyProjects";
import { Link } from 'react-router-dom'

// components
import NewComment from "./NewComment";

// styles
import './NewComment.css'

const NewComments = () => {
  const { myProjects } = useMyProjects();

  const inProgressProjects = myProjects.filter(
    (project) => project.comments.length > 0
  );
  // console.log(inProgressProjects)

  let allComments = [];

  inProgressProjects.forEach((project) => {
    const newComment = project.comments.map((comment) => ({ ...comment, projectId: project.id }));
    allComments.push(newComment);
  });

  let sortedComments = allComments.flat().sort((a, b) => b.createdAt - a.createdAt);

  console.log("Sorted comment")
  console.log(sortedComments);
  

  return (
    <div className="new-comments-container">
      <h3>New Comments</h3>
      {sortedComments.map(comment => (
        <Link to={`/projects/${comment.projectId}`} key={comment.id}>
          <NewComment key={comment.createdAt} comment={comment}/>
        </Link>
      ))}
    </div>
  );
};

export default NewComments;
