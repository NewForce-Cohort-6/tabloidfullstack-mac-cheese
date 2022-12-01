import React from "react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Card, CardBody, CardTitle } from "reactstrap";
import { useParams } from "react-router-dom";

export const Post = ({ post }) => {
  const { id } = useParams();
  const navigate = useNavigate();



//   return (
//     <Card className="m-4">
      
//       <CardBody>
//         <p>
//           <Link to={`/posts/${post.id}`}>
//           <strong>{post.title}</strong>
//           </Link>
//         </p>
//         <p>Author: {post.userProfile.displayName}</p>
//         <p>Category: {post.category.name}</p>
//         <p>          
//           {
//           post.comments.map(comment =>
//             <div key={comment.id} >{comment.message}</div> )
//           }
//         </p>
//       </CardBody>
//     </Card>
//   );
// };

// export default Post;







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
        height: "px",
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
  );
};

export default Post;



