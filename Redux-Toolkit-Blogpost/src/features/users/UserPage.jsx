import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { selectUserById } from "./userSlice";

/* ---------------------- Use of createAsyncThunk ------- */
// import { selectPostsByUser } from "../posts/postsSlice";
/* ------------------------------------------------------- */

import { useGetPostsByUserIdQuery } from "../posts/postsSlice";

const UserPage = () => {
  const { userId } = useParams();
  const user = useSelector((state) => selectUserById(state, Number(userId)));

  /* ---------------------- Use of createAsyncThunk ------- */
  // const postsForUser = useSelector((state) =>
  //   selectPostsByUser(state, Number(userId))
  // );
  /* -------------------------------------------------- */

  const {
    data: postsForUser,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetPostsByUserIdQuery(userId);

  /* ---------------------- Use of createAsyncThunk ------- */

  // const postTitles = postsForUser.map((post) => (
  //   <li key={post.id}>
  //     <Link to={`/post/${post.id}`}>{post.title}</Link>
  //   </li>
  // ));

  let content;
  if (isLoading) {
    content = <p>Loading...</p>;
  } else if (isSuccess) {
    const { ids, entities } = postsForUser;
    content = ids.map((id) => (
      <li key={id}>
        <Link to={`/post/${id}`}>{entities[id].title}</Link>
      </li>
    ));
  } else if (isError) {
    content = <p>{error}</p>;
  }

  return (
    <section>
      <h2>{user?.name}</h2>

      <ol>{content}</ol>
    </section>
  );
};

export default UserPage;
