// components
import Avatar from "../../../components/Avatar";

const NewComment = ({ comment, projects }) => {

  const commentProject = projects.find((project) =>
    project.comments.some((commentItem) => commentItem.id === comment.id)
  );

  let commentNamePreview;
  if (commentProject && commentProject.name) {
    if (commentProject.name.length > 30) {
      commentNamePreview =
        [...commentProject.name].slice(0, 30).join("") + "...";
    } else {
      commentNamePreview = commentProject.name;
    }
  }

  const commentPreview = [...comment.content].slice(0, 40);

  return (
    <div className="comment-form inner-common">
      <div className="comment-avatar">
        <Avatar src={comment.photoURL} />
      </div>
      <div className="comment-info">
        <p>
          {comment.displayName} - {commentProject && <>{commentNamePreview}</>}
        </p>
        <div className="comment-content">"{commentPreview}..."</div>
      </div>
    </div>
  );
};

export default NewComment;
