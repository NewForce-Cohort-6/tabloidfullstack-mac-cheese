import React from "react";
import { useState, useEffect } from "react";
import { AddComment } from "../../Managers/CommentManager";
import { CardLink } from "reactstrap";
import { useNavigate, useParams } from "react-router-dom";
import { getCurrentUser } from "../../Managers/UserProfileManager";

export const CommentNew = () => {
  const navigate = useNavigate();
  const currentUser = getCurrentUser();
  const { id } = useParams();

  const [newComment, setNewComment] = useState({
    subject: "",
    content: "",
    userProfileId: currentUser.id,
    postId: id,
  });

  const handleNewComment = (e) => {
    e.preventDefault();
    const commentToSend = {
      subject: newComment.subject,
      content: newComment.content,
      userProfileId: currentUser.id,
      postId: parseInt(id),
    };
    debugger;
    AddComment(commentToSend).then((t) => {
      navigate(`/posts/${id}`);
    });
  };

  const saveNewComment = (e) => {
    const copy = { ...newComment };
    copy[e.target.id] = e.target.value;
    setNewComment(copy);
  };

  return (
    <>
      <form onSubmit={handleNewComment}>
        <div className="col-md-3">
          <input
            type="text"
            placeholder="Subject"
            onChange={saveNewComment}
            className="form-control"
            id="subject"
          />
          <input
            type="text"
            placeholder="Content"
            onChange={saveNewComment}
            className="form-control"
            id="content"
          />
          <button type="submit" className="btn btn-primary mt-2">
            Save
          </button>
          <CardLink href={`/posts/${id}`}>Back to Posts</CardLink>
        </div>
      </form>
    </>
  );
};
