import React from "react";
import { Route, Routes } from "react-router-dom";
import CategoryList from "./categories/CategoryList";
import Hello from "./Hello";

export default function ApplicationViews() {

 return(
      <Routes>
        <Route path="/" element={<Hello />} />
        <Route path="/categories" element={<CategoryList />} />
      </Routes>
   );
 
}
