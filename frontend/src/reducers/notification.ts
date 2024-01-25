import { PayloadAction, SliceCaseReducers, createSlice } from "@reduxjs/toolkit";
import { INotification } from "../interfaces/notification";
import { AxiosError } from "axios";
import { ErrorResponse } from "../interfaces/login";
import { AppThunkDispatch } from "../interfaces/reducers";

const notificationSlice = createSlice<INotification, SliceCaseReducers<INotification>>({
  name: "notification",
  initialState: {
    message: "",
    type: null,
  },
  reducers: {
    setCurrentNotification: (_state_: INotification, action: PayloadAction<INotification>) => {
      return action.payload;
    },
    setAxiosError: (_state_: INotification, action: PayloadAction<unknown>) => {
      const axiosError = action.payload as AxiosError;
      const errorResponse = axiosError.response!.data as ErrorResponse;

      return {
        type: "error",
        message: errorResponse.error,
      };
    },
  },
});

export const { setCurrentNotification, setAxiosError } = notificationSlice.actions;

export const setNotification = (notification: INotification) => (dispatch: AppThunkDispatch) => {
  dispatch(setCurrentNotification(notification));
  setTimeout(() => {
    dispatch(setCurrentNotification({ message: "", type: null }));
  }, 5000);
};

export const setAxiosErrorMessage = (error: AxiosError) => (dispatch: AppThunkDispatch) => {
  dispatch(setAxiosError(error));
  setTimeout(() => {
    dispatch(setCurrentNotification({ message: "", type: null }));
  }, 5000);
};

export default notificationSlice.reducer;