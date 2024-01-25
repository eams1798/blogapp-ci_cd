import { PayloadAction, SliceCaseReducers, createSlice } from "@reduxjs/toolkit";
import { IUser, updatableUserParameters } from "../interfaces/user";
import userService from "../services/users";
import { AppThunkDispatch } from "../interfaces/reducers";
import { IBlog } from "../interfaces/blog";

const usersSlice = createSlice<IUser[], SliceCaseReducers<IUser[]>>({
  name: "users",
  initialState: [],
  reducers: {
    setUsers: (_state_: IUser[], action: PayloadAction<IUser[]>) => {
      return action.payload;
    },
    addUser: (state: IUser[], action: PayloadAction<IUser>) => {
      state.push(action.payload);
    },
    updateUser: (state: IUser[], action: PayloadAction<updatableUserParameters>) => {
      const index = state.findIndex((user) => user.id === action.payload.id);
      state[index] = {
        ...state[index],
        ...action.payload,
      };
    },
    addBlogToUser: (state: IUser[], action: PayloadAction<{id: string, blog: IBlog}>) => {
      const index = state.findIndex((user) => user.id === action.payload.id);
      state[index].blogs!.push(action.payload.blog);
    },
    removeUser: (state: IUser[], action: PayloadAction<IUser>) => {
      return state.filter((user) => user.id !== action.payload.id);
    },
    removeBlogFromUser: (state: IUser[], action: PayloadAction<{id: string, blogId: string}>) => {
      const index = state.findIndex((user) => user.id === action.payload.id);
      const blogIndex = state[index].blogs!.findIndex((blog) => blog.id === action.payload.blogId);
      state[index].blogs!.splice(blogIndex, 1);
    }
  },
});

export const { setUsers, addUser, updateUser, addBlogToUser, removeUser, removeBlogFromUser } = usersSlice.actions;

export const loadUsers = () => async (dispatch: AppThunkDispatch) => {
  const users = await userService.getAll();
  dispatch(setUsers(users));
};

export default usersSlice.reducer;