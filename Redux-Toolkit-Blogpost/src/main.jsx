import React from "react";
import "./index.css";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { store } from "./app/store.js";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

/* ---------------------- Use of createAsyncThunk ------- */

// import { fetchPosts } from "./features/posts/postsSlice.jsx";
import { fetchUsers } from "../src/features/users/userSlice.jsx";

store.dispatch(fetchUsers());
// store.dispatch(fetchPosts());

/* ---------------------- Use of RTK Query ------- */

import { extendedApiSlice } from "./features/posts/postsSlice";

store.dispatch(extendedApiSlice.endpoints.getPosts.initiate());

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <Router>
      <Routes>
        <Route path="/*" element={<App />} />
      </Routes>
    </Router>
  </Provider>
);
