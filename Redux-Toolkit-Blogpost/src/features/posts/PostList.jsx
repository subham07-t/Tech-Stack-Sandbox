import React from "react";
import { useSelector } from "react-redux";
import PostsExcerpt from "../posts/PostsExcerpt";

/* ---------------------- Use of RTK Query ------- */

import { selectPostIds } from "./postsSlice";
import { useGetPostsQuery } from "./postsSlice";

const PostsList = () => {
  const { isLoading, isSuccess, isError, error } = useGetPostsQuery();

  const orderedPostIds = useSelector(selectPostIds);

  let content;
  if (isLoading) {
    content = <p>"Loading..."</p>;
  } else if (isSuccess) {
    content = orderedPostIds.map((postId) => (
      <PostsExcerpt key={postId} postId={postId} />
    ));
  } else if (isError) {
    content = <p>{error}</p>;
  }

  return <section>{content}</section>;
};
export default PostsList;

/* ---------------------- Use of createAsyncThunk ------- */

// import { selectPostIds, getPostsStatus, getPostsError } from "./postsSlice";

// const PostList = () => {
//   const orderedPostIds = useSelector(selectPostIds);
//   const postStatus = useSelector(getPostsStatus);
//   const error = useSelector(getPostsError);

//   let content;
//   if (postStatus === "loading") {
//     content = <p>"Loading..."</p>;
//   } else if (postStatus === "succeeded") {
//     content = orderedPostIds.map((postId) => (
//       <PostsExcerpt key={postId} postId={postId} />
//     ));
//   } else if (postStatus === "failed") {
//     content = <p>{error}</p>;
//   }

//   return <section>{content}</section>;
// };

// export default PostList;
