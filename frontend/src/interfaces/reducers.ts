import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import { IBlog } from "./blog";
import { INotification } from "./notification";
import { loginResponse } from "./login";
import { IUser } from "./user";

export interface AppState {
  blogs: IBlog[];
  notification: INotification;
  users: IUser[];
  loginUser: loginResponse | null;
}

export type AppThunkDispatch = ThunkDispatch<AppState, unknown, AnyAction>;