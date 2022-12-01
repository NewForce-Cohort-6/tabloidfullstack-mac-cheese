import React from "react";
import { useState, useEffect } from "react";
import Reaction from "./Reaction";
import { getAllReactions } from "./ReactionManager";
import { Link } from "react-router-dom";

const ReactList = () => {
  const [reactions, setReactions] = useState([]);

  const getPosts = () => {
    getAllReactions().then((res) => setReactions(res));
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <>
      <div className="container">
        <div className="row justify-content-center">
          <div className="cards-column">
            {reactions.map((reaction) => (
              <Reaction key={reaction.id} reaction={reaction} />
            ))}
          </div>
        </div>
        <Link to={`/Reactions/add`}>
        <button>Add New Reaction</button>
      </Link>
      </div>
      
    </>
  );
};

export default ReactList;
