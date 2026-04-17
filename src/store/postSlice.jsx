import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  posts: [],
  loading: false,
};

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    resetPostState: () => {
      return initialState;
    },
    clearPostsState: (state) => {
      state.posts = [];
      state.loading = false;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setReduxPosts: (state, action) => {
      state.posts = action.payload; // initial fetch ke baad sab posts set karo
    },
    addPost: (state, action) => {
      state.posts.unshift(action.payload); // naya post upar aaye
    },
    updatePost: (state, action) => {
      const index = state.posts.findIndex((p) => p.$id === action.payload.$id);
      if (index !== -1) state.posts[index] = action.payload;
    },
    deletePost: (state, action) => {
      state.posts = state.posts.filter((p) => p.$id !== action.payload);
    },
  },
});

export const {
  resetPostState,
  clearPostsState,
  setReduxPosts,
  addPost,
  updatePost,
  deletePost,
  setLoading,
} = postSlice.actions;
export default postSlice.reducer;
