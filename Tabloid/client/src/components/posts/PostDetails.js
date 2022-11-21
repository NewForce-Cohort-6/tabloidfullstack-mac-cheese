import React from "react";
import { useEffect, useState } from "react";
import { ListGroup, ListGroupItem } from "reactstrap";
import { getPosts } from "./PostManager";
import { useParams } from "react-router-dom";
import Post from "./Post";

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
          <Post post={post} />
          <Liost.comments.map((c) => (
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
                        <td>{c.displayName}</td>
                        <td>{c.createDateTime}</td>
                    </tr>
                </table>
              </ListGroupItemstGroup>
            {p>
            ))}
          </ListGroup>
        </div>
      </div>
    </div>
  );
};

export default PostDetails;
