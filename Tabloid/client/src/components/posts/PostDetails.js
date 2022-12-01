import React from "react";
import { useEffect, useState } from "react";
import { ListGroup, ListGroupItem } from "reactstrap";
import { getPosts } from "./PostManager";
import { useParams } from "react-router-dom";
import Post from "./Post";
import { CardLink } from "reactstrap";

const PostDetails = () => {
  const [post, setPost] = useState();
  const { id } = useParams();

  useEffect(() => {
    getPosts(id).then(setPost);
  }, []);

  if (!post) {
    return null;
  }

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-sm-12 col-lg-6">
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
            <strong>{post.title}</strong>
            <p>
              Author: {post.userProfile.firstName} {post.userProfile.lastName}
            </p>
            <p>Category: {post.category?.name}</p>
          </div>
          <ListGroup flush>
            {post.comments.map((c) => (
              <ListGroupItem>
                <table>
                  <tr>
                    <th>Subject</th>
                    <th>Content</th>
                    <th>Display Name</th>
                    <th>Comment Date Time</th>
                  </tr>
                  <tr>
                    <td>{c.subject}</td>
                    <td>{c.content}</td>
                    <td>{c.userProfile?.displayName}</td>
                    <td>{c.createDateTime}</td>
                  </tr>
                </table>
              </ListGroupItem>
            ))}
          </ListGroup>
          <CardLink href={`/posts/${id}/addComment`}>Add Comment</CardLink>
        </div>
      </div>
    </div>
  );
};

export default PostDetails;
