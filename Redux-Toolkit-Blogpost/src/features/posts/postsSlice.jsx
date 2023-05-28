/* ------- For RTK Query ---- */
import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { sub } from "date-fns";
import { apiSlice } from "../api/apiSlice";

const postsAdapter = createEntityAdapter({
  sortComparer: (a, b) => b.date.localeCompare(a.date),
});

const initialState = postsAdapter.getInitialState();

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: () => "/posts",
      transformErrorResponse: (responseData) => {
        let min = 1;
        const loadedPosts = responseData.map((post) => {
          if (!post?.date)
            post.date = sub(new Date(), { minutes: min++ }).toISOString();
          if (!post?.reactions)
            post.reactions = {
              thumbsUp: 0,
              wow: 0,
              heart: 0,
              rocket: 0,
              coffee: 0,
            };
          return post;
        });
        return postsAdapter.setAll(initialState, loadedPosts);
      },
      providesTags: (result, error, arg) => [
        { type: "Post", id: "LIST" },
        ...result.ids.map((id) => ({ type: "Post", id })),
      ],
    }),
    getPostsByUserId: builder.query({
      query: (id) => `/posts/?userId=${id}`,
      transformResponse: (responseData) => {
        let min = 1;
        const loadedPosts = responseData.map((post) => {
          if (!post?.date)
            post.date = sub(new Date(), { minutes: min++ }).toISOString();
          if (!post?.reactions)
            post.reactions = {
              thumbsUp: 0,
              wow: 0,
              heart: 0,
              rocket: 0,
              coffee: 0,
            };
          return post;
        });
        return postsAdapter.setAll(initialState, loadedPosts);
      },
      providesTags: (result, error, arg) => [
        ...result.ids.map((id) => ({ type: "Post", id })),
      ],
    }),
    addNewPost: builder.mutation({
      query: (initialPost) => ({
        url: "/posts",
        method: "POST",
        body: {
          ...initialPost,
          userId: Number(initialPost.userId),
          date: new Date().toISOString(),
          reactions: {
            thumbsUp: 0,
            wow: 0,
            heart: 0,
            rocket: 0,
            coffee: 0,
          },
        },
      }),
      invalidatesTags: [{ type: "Post", id: "LIST" }],
    }),
    updatePost: builder.mutation({
      query: (initialPost) => ({
        url: `/posts/${initialPost.id}`,
        method: "PUT",
        body: {
          ...initialPost,
          date: new Date().toISOString(),
        },
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Post", id: arg.id }],
    }),
    deletePost: builder.mutation({
      query: ({ id }) => ({
        url: `/posts/${id}`,
        method: "DELETE",
        body: { id },
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Post", id: arg.id }],
    }),
    addReaction: builder.mutation({
      query: ({ postId, reactions }) => ({
        url: `posts/${postId}`,
        method: "PATCH",

        // In a real app, we'd probably need to base this on user ID somehow
        // so that a user can't do the same reaction more than once
        body: { reactions },
      }),
      async onQueryStarted(
        { postId, reactions },
        { dispatch, queryFulfilled }
      ) {
        // `updateQueryData` requires the endpoint name and cache key arguments,
        // so it knows which piece of cache state to update
        const patchResult = dispatch(
          extendedApiSlice.util.updateQueryData(
            "getPosts",
            undefined,
            (draft) => {
              // The `draft` is Immer-wrapped and can be "mutated" like in createSlice
              const post = draft.entities[postId];
              if (post) post.reactions = reactions;
            }
          )
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),
  }),
});

export const {
  useGetPostsQuery,
  useGetPostsByUserIdQuery,
  useAddNewPostMutation,
  useDeletePostMutation,
  useUpdatePostMutation,
  useAddReactionMutation,
} = extendedApiSlice;

// returns the query result object
export const selectPostsResult = extendedApiSlice.endpoints.getPosts.select();

// Creates memoized selector
const selectPostsData = createSelector(
  selectPostsResult,
  (postsResult) => postsResult.data // normalized state object with ids & entities
);

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
  selectAll: selectAllPosts,
  selectById: selectPostById,
  selectIds: selectPostIds,
  // Pass in a selector that returns the posts slice of state
} = postsAdapter.getSelectors(
  (state) => selectPostsData(state) ?? initialState
);

/* ------- For createAsyncThunk ---- */

// import {
//   createSlice,
//   createAsyncThunk,
//   createSelector,
//   createEntityAdapter,
// } from "@reduxjs/toolkit";

// import axios from "axios";
// import { nanoid } from "@reduxjs/toolkit";
// import { sub } from "date-fns";

// const postsAdapter = createEntityAdapter({
//   sortComparer: (a, b) => b.date.localeCompare(a.date),
// });

// const BASE_URL = "https://jsonplaceholder.typicode.com/posts";

// const initialState = postsAdapter.getInitialState({
//   status: "idle", //'idle' | 'loading' | 'succeeded' | 'failed'
//   error: null,
//   count: 0,
// });

// export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
//   const response = await axios.get(BASE_URL);
//   return response.data;
// });

// export const addNewPost = createAsyncThunk(
//   "posts/addNewPost",
//   async (initialPost) => {
//     const response = await axios.post(BASE_URL, initialPost);
//     return response.data;
//   }
// );

// export const updatePost = createAsyncThunk(
//   "posts/updatePost",
//   async (initialPost) => {
//     const { id } = initialPost;
//     try {
//       const response = await axios.put(`${BASE_URL}/${id}`, initialPost);
//       return response.data;
//     } catch (err) {
//       return err.message;
//     }
//   }
// );

// export const deletePost = createAsyncThunk(
//   "posts/deletePost",
//   async (initialPost) => {
//     const { id } = initialPost;
//     try {
//       const response = await axios.delete(`${BASE_URL}/${id}`);
//       if (response?.status === 200) return initialPost;
//       return `${response?.status}: ${response?.statusText}`;
//     } catch (err) {
//       return initialPost;
//     }
//   }
// );

// const postsSlice = createSlice({
//   name: "posts",
//   initialState,
//   reducers: {
//     // postAdded: {
//     //   reducer(state, action) {
//     //     state.posts.push(action.payload);
//     //   },
//     //   prepare(title, content, userId) {
//     //     return {
//     //       payload: {
//     //         id: nanoid(),
//     //         title,
//     //         content,
//     //         date: new Date().toISOString(),
//     //         userId,
//     //         reactions: {
//     //           thumbsUp: 0,
//     //           wow: 0,
//     //           heart: 0,
//     //         },
//     //       },
//     //     };
//     //   },
//     // },
//     reactionAdded(state, action) {
//       const { postId, reaction } = action.payload;
//       const existingPost = state.entities[postId];
//       if (existingPost) {
//         existingPost.reactions[reaction]++;
//       }
//     }
//   },
//   extraReducers(builder) {
//     builder
//       .addCase(fetchPosts.pending, (state) => {
//         state.status = "loading";
//       })
//       .addCase(fetchPosts.fulfilled, (state, action) => {
//         state.status = "succeeded";
//         // Adding date and reactions
//         let min = 1;
//         const loadedPosts = action.payload.map((post) => {
//           post.date = sub(new Date(), { minutes: min++ }).toISOString();
//           post.reactions = {
//             thumbsUp: 0,
//             wow: 0,
//             heart: 0,
//           };
//           return post;
//         });

//         // Add any fetched posts to the array
//         postsAdapter.upsertMany(state, loadedPosts);
//       })
//       .addCase(fetchPosts.rejected, (state, action) => {
//         state.status = "failed";
//         state.error = action.error.message;
//       })
//       .addCase(addNewPost.fulfilled, (state, action) => {
//         const sortedPosts = state.posts.sort((a, b) => {
//           if (a.id > b.id) return 1;
//           if (a.id < b.id) return -1;
//           return 0;
//         });
//         action.payload.id = sortedPosts[sortedPosts.length - 1].id + 1;

//         action.payload.userId = Number(action.payload.userId);
//         action.payload.date = new Date().toISOString();
//         action.payload.reactions = {
//           thumbsUp: 0,
//           hooray: 0,
//           heart: 0,
//         };
//         postsAdapter.addOne(state, action.payload);
//       })
//       .addCase(updatePost.fulfilled, (state, action) => {
//         if (!action.payload?.id) {
//           console.log("Update could not complete");
//           console.log(action.payload);
//           return;
//         }
//         action.payload.date = new Date().toISOString();
//         postsAdapter.upsertOne(state, action.payload);
//       })
//       .addCase(deletePost.fulfilled, (state, action) => {
//         if (!action.payload?.id) {
//           console.log("Delete could not complete");
//           console.log(action.payload);
//           return;
//         }

//         postsAdapter.removeOne(state, id);
//       });
//   },
// });

// //getSelectors creates these selectors and we rename them with aliases using destructuring
// export const {
//   selectAll: selectAllPosts,
//   selectById: selectPostById,
//   selectIds: selectPostIds,
//   // Pass in a selector that returns the posts slice of state
// } = postsAdapter.getSelectors((state) => state.posts);

// export const getPostsStatus = (state) => state.posts.status;
// export const getPostsError = (state) => state.posts.error;

// export const selectPostsByUser = createSelector(
//   [selectAllPosts, (state, userId) => userId],
//   (posts, userId) => posts.filter((post) => post.userId === userId)
// );

// export const { reactionAdded } = postsSlice.actions;

// export default postsSlice.reducer;
