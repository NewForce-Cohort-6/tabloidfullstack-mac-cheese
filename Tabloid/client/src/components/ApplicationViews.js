import React from "react";
import { Route, Routes } from "react-router-dom";
import CategoryDelete from "./categories/CategoryDelete";
import CategoryForm from "./categories/CategoryForm";
import CategoryList from "./categories/CategoryList";
import Hello from "./Hello";
import TagList from "./Tags/TagList";
import UserProfileList from "./userProfiles/UserProfileList";

export default function ApplicationViews() {

 return(
      <Routes>
        <Route path="/" element={<Hello />} />
        <Route path="/categories" element={<CategoryList />} />
        <Route path="/createCategory" element={<CategoryForm />} />
        <Route path="/deleteCategory/:id" element={<CategoryDelete />} />
        <Route path="/tags" element={<TagList />} />
        <Route path="/users" element={<UserProfileList />} />
      </Routes>
   );
 
}
