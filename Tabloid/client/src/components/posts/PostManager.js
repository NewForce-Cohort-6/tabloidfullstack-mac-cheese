import React from "react";

// const baseUrl = '/api/post';

export const getAllPosts = () => {
  return fetch(`https://localhost:5001/api/Post`).then((res) => res.json());
};

export const getPosts = (id) => {
  return fetch(`/api/post/GetWithComments/${id}`).then((res) => res.json());
};

export const getUserPosts = () => { 
  return fetch(`/api/post/User/${currentUser.id}`)
    .then((res) => res.json())
};


export const getPostById = (id) => {
  return fetch(`/api/post/${id}`)
      .then((res) => res.json())
};

// export const getUserPostsById = (id) => {
//   return fetch(`/api/post/getUserPostsById?id=${id}`)
//     .then((res) => res.json());
// }



