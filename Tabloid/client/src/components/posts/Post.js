import React from "react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Card, CardBody, CardTitle } from "reactstrap";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

export const Post = ({ post }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    // <div style={{display:'flex', letterSpacing: '.5px', alignItems: 'center', margin: '15px', flexDirection: "column", borderBottom: '1px solid gray', height: '30px', width: '500px', justifyContent: 'space-between'}}>
    //     <h5 style={{ marginRight: '15px' }}>{post.title}    {post.userProfile.firstName}   {post.userProfile.lastName}  {post.category.name}</h5>
    // </div>

    <div
      style={{
        display: "flex",
        letterSpacing: ".5px",
        alignItems: "center",
        margin: "15px",
        flexDirection: "row",
        borderBottom: "1px solid gray",
        height: "30px",
        width: "500px",
        justifyContent: "space-between",
      }}
    >
      <Link to={`${post.id}`}>{post.title}</Link>
      <p>
        Author: {post.userProfile.firstName} {post.userProfile.lastName}
      </p>
      <p>Category: {post.category?.name}</p>
    </div>
  );
};

export default Post;
