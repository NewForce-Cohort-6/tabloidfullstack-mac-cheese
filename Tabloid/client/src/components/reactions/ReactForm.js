import React from "react";
import { useEffect, useState } from "react";
import ReactList from "./ReactionList";
import Reaction from "./Reaction";
import { addReaction } from "./ReactionManager";
import { Navigate, useNavigate } from "react-router-dom";

export const ReactForm = ({ getPosts }) => {
  const [newReact, setNewReact] = useState({
    Name: "",
    ImageLocation: "",
  });
  const navigate = useNavigate();

  const handleSaveNewReact = (e) => {
    e.preventDefault();
    const reactToSendToAPI = {
      Name: newReact.Name,
      ImageLocation: newReact.ImageLocation,
    };
    return addReaction(reactToSendToAPI).then((p) => {
      navigate("/Reactions");
    });
  };

  const saveNewReact = (e) => {
    const copy = { ...newReact };
    copy[e.target.id] = e.target.value;
    setNewReact(copy);
  };

  return (
    <>
      <h2>It works!</h2>
      <form onSubmit={handleSaveNewReact}>
        <div className="col-md-6">
          <label htmlFor="Name" className="form-label">
            Name
          </label>
          <input
            type="text"
            onChange={saveNewReact}
            className="form-control"
            id="Name"
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="ImageLocation" className="form-label">
            Image URL
          </label>
          <input
            type="text"
            onChange={saveNewReact}
            className="form-control"
            id="ImageLocation"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Save
        </button>
      </form>
    </>
  );
};

export default ReactForm;
