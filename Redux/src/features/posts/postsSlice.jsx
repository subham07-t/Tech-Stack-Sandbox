import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  {
    id: "1",
    title: "Enhancing with Redux Toolkit",
    content: "Exceptional content",
  },
  { id: "2", title: "Perfecting Slices", content: "Nailing it with finesse" },
];

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
});

export default postsSlice.reducer;
