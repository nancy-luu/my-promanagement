import React from "react";
import { useMyProjects } from "../../hooks/useMyProjects";
import NewComment from "./NewComment";

const NewComments = () => {
  const { myProjects } = useMyProjects();

  const inProgressProjects = myProjects.filter(
    (project) => project.comments.length > 0
  );
  // console.log(inProgressProjects)

  let allComments = [];

  inProgressProjects.forEach((project) => {
    allComments.push(project.comments);
  });

  let sortedComments = allComments.flat().sort((a, b) => b.createdAt - a.createdAt);

  console.log(sortedComments);
  

  return (
    <div className="new-comments-container">
      <h3>New Comments</h3>
      {sortedComments.map(comment => (
        <NewComment key={comment.createdAt} comment={comment}/>
      ))}
    </div>
  );
};

export default NewComments;
