import { configureStore } from "@reduxjs/toolkit";

/* ---------------------- Use of RTK Query ------- */

import { apiSlice } from "../features/api/apiSlice";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

/* ---------------------- Use of createAsyncThunk ------- */

// import postsSlice from "../features/posts/postsSlice";
// import userSlice from "../features/users/userSlice";

// export const store = configureStore({
//   reducer: {
//     posts: postsSlice,
//     users: userSlice,
//   },
// });
