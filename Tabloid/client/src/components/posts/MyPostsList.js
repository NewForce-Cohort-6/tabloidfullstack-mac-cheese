
import React from "react";
import { Card, CardBody } from "reactstrap";
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { getUserPosts } from "./PostManager";
import { getUserPostsById } from "./PostManager";
import { useNavigate } from "react-router-dom";
import Post from "./Post";



const MyPostList = () => {
    const [posts, setPosts] = useState([]);

    const { id } = useParams();
    const navigate = useNavigate();

    const localUser = localStorage.getItem("userProfile")
    const currentUser = JSON.parse(localUser)

    const getPosts = () => {
        //get current user from local storage
        // pass currentUser object as paramater in getUserPost function.
        getUserPosts(currentUser).then( all => setPosts(all))
    };
    useEffect(() => {
        getPosts();
    }, []);

    
    return (     <>
         
            <h2 className="text-center">My Posts</h2> 
            <div className="col m-2 p-2 justify-content-center">
            {posts.map((p) => (
                  <div style={{display: 'flex'}}>
                    <Post key={p.id} post={p} />                   
                    </div>
                    ))}
            </div>
           
        </>
    );
};

export default MyPostList;


// const PostList = () => {
//     const [posts, setPosts] = useState([]);

   
//     const navigate = useNavigate();

//     const getPosts = () => {
//         getAllPosts().then( all => setPosts(all))
//     };
//     useEffect(() => {
//         getPosts();
//     }, []);

    
//     return (
//       <div className="container">
//         <div className="row justify-content-center" style={{display: 'flex', flexDirection: 'column'}}>
//           <h4 style={{marginTop: '20px', marginBottom: '15px'}}>Posts</h4>
//           {/* <strong>Title</strong><strong>Author</strong><strong>Category</strong> */}
//             <div className="cards-column">
//                 {posts.map((p) => (
//                   <div style={{display: 'flex'}}>
//                     <Post key={p.id} post={p} />                   
//                     </div>
//                     ))}
//         </div>
//       </div>
//     </div>
//     )
// }

// export default PostList;
