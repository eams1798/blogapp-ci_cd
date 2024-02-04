import { PayloadAction, SliceCaseReducers, createSlice } from "@reduxjs/toolkit";
import { AppThunkDispatch } from "../interfaces/reducers";
import { loginCredentials, loginResponse } from "../interfaces/login";
import loginService from "../services/login";
import storageService from "../services/storage";
import axios from "axios";
import { setAxiosErrorMessage } from "./notification";

const loginUserSlice = createSlice<loginResponse | null, SliceCaseReducers<loginResponse | null>>({
  name: "user",
  initialState: null,
  reducers: {
    setUser: (_state_: loginResponse | null, action: PayloadAction<loginResponse | null>) => {
      return action.payload;
    },
  },
});

export const { setUser } = loginUserSlice.actions;

export const loadLoginUser = () => (dispatch: AppThunkDispatch) => {
  const user = storageService.getLoggedUser();
  if (user) {
    dispatch(setUser(user));
  }
};

export const login = ({ username, password }: loginCredentials) => async (dispatch: AppThunkDispatch) => {
  try {
    const user = await loginService.login({ username, password });
    storageService.saveLoggedUser(user);
    dispatch(setUser(user));
  } catch (error) {
    if (axios.isAxiosError(error)) {
      dispatch(setAxiosErrorMessage(error));
    } else {
      console.log(error);
    }
  }
};

export const logout = () => (dispatch: AppThunkDispatch) => {
  storageService.removeLoggedUser();
  dispatch(setUser(null));
};

export default loginUserSlice.reducer;