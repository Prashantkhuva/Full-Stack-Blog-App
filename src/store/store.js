import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer, { logout } from "./authSlice.jsx";
import postReducer from "./postSlice.jsx";

const appReducer = combineReducers({
  auth: authReducer,
  post: postReducer,
});

const rootReducer = (state, action) => {
  if (action.type === logout.type) {
    state = undefined;
  }

  return appReducer(state, action);
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;
