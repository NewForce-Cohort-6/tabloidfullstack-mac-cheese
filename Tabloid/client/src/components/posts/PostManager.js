import React from "react";

// const baseUrl = '/api/post';

export const getAllPosts = () => {
  return fetch(`https://localhost:5001/api/Post`).then((res) => res.json());
};

export const getPosts = (id) => {
  return fetch(`/api/post/GetWithComments/${id}`).then((res) => res.json());
};
