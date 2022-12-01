import React from "react";
import { Card, CardImg, CardBody } from "reactstrap";

const Reaction = ({ reaction }) => {
  return (
    <Card className="m-4">
      <p className="text-left px-2">{reaction.name}</p>
      <CardImg top src={reaction.imageLocation} />
    </Card>
  );
};

export default Reaction;
