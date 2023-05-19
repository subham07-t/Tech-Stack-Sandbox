import React from "react";
import PostList from "./features/posts/PostList";
import AddPostForm from "./features/posts/AddPostForm";

const App = () => {
  return (
    <div>
      <AddPostForm />
      <PostList />
    </div>
  );
};

export default App;
