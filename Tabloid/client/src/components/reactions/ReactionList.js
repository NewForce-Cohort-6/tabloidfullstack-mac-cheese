import React from "react";
import { useState, useEffect } from "react";
import Reaction from "./Reaction";
import { getAllReactions } from "./ReactionManager";

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
      </div>
    </>
  );
};

export default ReactList;
