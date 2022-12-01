import React from "react";
import { Route, Routes } from "react-router-dom";
import CategoryDelete from "./categories/CategoryDelete";
import CategoryEdit from "./categories/CategoryEdit";
import CategoryForm from "./categories/CategoryForm";
import CategoryList from "./categories/CategoryList";
import PostList from "./posts/PostList";
import ReactList from "./reactions/ReactionList";
import PostDetails from "./posts/PostDetails";
import ReactForm from "./reactions/ReactForm";

// import { Post } from "./posts/Post";
import Hello from "./Hello";
import TagDelete from "./Tags/TagDelete";
import TagForm from "./Tags/TagForm";
import TagList from "./Tags/TagList";
import UserProfileDetails from "./userProfiles/UserProfileDetail";
import UserProfileList from "./userProfiles/UserProfileList";
import PostDetails from "./posts/PostDetails";
import TagEdit from "./Tags/TagEdit";
import { CommentNew } from "./comments/CommentNew";

export default function ApplicationViews() {
  return (
    <Routes>
      <Route path="/" element={<Hello />} />
      <Route path="/categories" element={<CategoryList />} />
      <Route path="/createCategory" element={<CategoryForm />} />
      <Route path="/deleteCategory/:id" element={<CategoryDelete />} />
      <Route path="/editCategory/:id" element={<CategoryEdit />} />
      <Route path="/tags" element={<TagList />} />
      <Route path="/users" element={<UserProfileList />} />
      <Route path="/createTag" element={<TagForm />} />
      <Route path="/posts" element={<PostList />} />
      <Route path="/deleteTag/:id" element={<TagDelete />} />
      <Route path="/editTag/:id" element={<TagEdit />} />
      <Route path="posts/:id" element={<PostDetails />} />
      <Route path="/Reactions" element={<ReactList />} />
      <Route path="/Reactions/add" element={<ReactForm />} />
      <Route path="posts/:id/addComment" element={<CommentNew />} />
    </Routes>
  );
}
