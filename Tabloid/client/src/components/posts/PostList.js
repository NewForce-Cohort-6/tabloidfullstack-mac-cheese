import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import {Post} from "./Post"
import { getAllPosts, getById } from "./PostManager";

const PostList = () => {
    const [posts, setPosts] = useState([]);

   
    const navigate = useNavigate();

    const getPosts = () => {
        getAllPosts().then( all => setPosts(all))
    };
    useEffect(() => {
        getPosts();
    }, []);

    
    return (
      <div className="container">
        <div className="row justify-content-center" style={{display: 'flex', flexDirection: 'column'}}>
          <h4 style={{marginTop: '20px', marginBottom: '15px'}}>Posts</h4>
          
            <div className="cards-column">
                {posts.map((p) => (
                  <div style={{display: 'flex'}}>
                    <Post key={p.id} post={p} />                   
                    </div>
                    ))}
        </div>
      </div>
    </div>
    )
}

export default PostList;