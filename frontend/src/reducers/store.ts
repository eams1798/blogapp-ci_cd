import { configureStore } from "@reduxjs/toolkit";
import blogReducer from "./blogs";
import notificationReducer from "./notification";
import usersReducer from "./users";
import loginUserReducer from "./loginUser";

export const store = configureStore({
  reducer : {
    blogs: blogReducer,
    notification: notificationReducer,
    users: usersReducer,
    loginUser: loginUserReducer
  }
});
