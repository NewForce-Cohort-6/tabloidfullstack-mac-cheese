import React from "react";
import { Route, Routes } from "react-router-dom";
import CategoryDelete from "./categories/CategoryDelete";
import CategoryForm from "./categories/CategoryForm";
import CategoryList from "./categories/CategoryList";
import  PostList from "./posts/PostList";

// import { Post } from "./posts/Post";
import Hello from "./Hello";

export default function ApplicationViews() {

 return(
      <Routes>
        <Route path="/" element={<Hello />} />
        <Route path="/categories" element={<CategoryList />} />
        <Route path="/createCategory" element={<CategoryForm />} />
        <Route path="/deleteCategory/:id" element={<CategoryDelete />} />   
        <Route path="/posts" element={<PostList />} />

        {/* <Route path="/posts/" element={<PostList />} /> */}


      </Routes>
   );
 
}
