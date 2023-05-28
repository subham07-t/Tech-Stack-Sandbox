import React from "react";

/* ---------------------- Use of createAsyncThunk ------- */
// import { reactionAdded } from "./postsSlice";
// import { useDispatch } from "react-redux";
/* ----------------------------------------------------- */

import { useAddReactionMutation } from "./postsSlice";

const emoji = {
  thumbsUp: "👍",
  wow: "😮",
  heart: "❤️",
};

const ReactionButtons = ({ post }) => {
  /* ---------------------- Use of createAsyncThunk ------- */
  // const dispatch = useDispatch();
  /* ----------------------------------------------------- */

  const [addReaction] = useAddReactionMutation();
  const reactionButtons = Object.entries(emoji).map(([name, emoji]) => {
    return (
      <button
        key={name}
        type="button"
        /* ---------------------- Use of createAsyncThunk ------- */
        // onClick={() =>
        //   dispatch(reactionAdded({ postId: post.id, reaction: name }))
        // }
        /* ----------------------------------------------------- */
        onClick={() => {
          const newValue = post.reactions[name] + 1;
          addReaction({
            postId: post.id,
            reactions: { ...post.reactions, [name]: newValue },
          });
        }}
      >
        {" "}
        {emoji} {post.reactions[name]}
      </button>
    );
  });
  return <div>{reactionButtons}</div>;
};

export default ReactionButtons;
