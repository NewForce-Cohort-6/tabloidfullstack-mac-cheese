import React from "react";

// const baseUrl = '/api/post';

// const currentUser = localStorage.getItem("userProfile");

const localUser = localStorage.getItem("userProfile")
const currentUser = JSON.parse(localUser)


export const getAllPosts = () => {
    //  getUserPosts
  return fetch(`https://localhost:5001/api/Post`).then((res) => res.json());
};

export const getPosts = (id) => {
  return fetch(`/api/post/GetWithComments/${id}`).then((res) => res.json());
};

export const getUserPosts = (currentUser) => { 
  return fetch(`/api/post/User/${currentUser.id}`)
    .then((res) => res.json())
};


// export const getPostById = (id) => {
//   return fetch(`/api/post/${id}`)
//       .then((res) => res.json())
// };

// export const getPostsById = (id) => {
//   return fetch(`/api/post/User?id=${id}`)
//     .then((res) => res.json());
// }




