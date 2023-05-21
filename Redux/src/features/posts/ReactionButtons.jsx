import React from "react";
import { reactionAdded } from "./postsSlice";
import { useDispatch } from "react-redux";

const emoji = {
  thumbsUp: "👍",
  wow: "😮",
  heart: "❤️",
};

const ReactionButtons = ({ post }) => {
  const dispatch = useDispatch();
  const reactionButtons = Object.entries(emoji).map(([name, emoji]) => {
    return (
      <button
        key={name}
        type="button"
        onClick={() =>
          dispatch(reactionAdded({ postId: post.id, reaction: name }))
        }
      >
        {" "}
        {emoji} {post.reactions[name]}
      </button>
    );
  });
  return <div>{reactionButtons}</div>;
};

export default ReactionButtons;
