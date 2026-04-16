import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice.jsx";
import postReducer from "./postSlice.jsx";

const store = configureStore({
  reducer: {
    auth: authReducer,
    post: postReducer,
  },
});

export default store;
