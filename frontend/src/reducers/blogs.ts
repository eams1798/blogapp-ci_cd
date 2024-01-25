import { PayloadAction, SliceCaseReducers, createSlice } from "@reduxjs/toolkit";
import { IBlog } from "../interfaces/blog";
import blogService from "../services/blogs";
import { AppThunkDispatch } from "../interfaces/reducers";
import { addBlogToUser, removeBlogFromUser } from "./users";
import { setAxiosErrorMessage, setNotification } from "./notification";
import { isAxiosError } from "axios";
import { IComment } from "../interfaces/comment";

const blogSlice = createSlice<IBlog[], SliceCaseReducers<IBlog[]>, string>({
  name: "blogs",
  initialState: [],
  reducers: {
    setBlogs: (_state_: IBlog[], action: PayloadAction<IBlog[]>) => {
      return action.payload;
    },

    addBlog: (state: IBlog[], action: PayloadAction<IBlog>) => {
      state.push(action.payload);
    },

    addCommentToBlog: (state: IBlog[], action: PayloadAction<IComment>) => {
      const comment = action.payload;
      const commentBlog = comment.blog as IBlog;
      const blogId = state.findIndex((blog) => blog.id === commentBlog.id);
      state[blogId].comments!.push(comment);
    },

    likeBlogById: (state: IBlog[], action: PayloadAction<string>) => {
      const blog = state.find((blog) => blog.id === action.payload);
      if (blog) {
        const index = state.indexOf(blog);
        state[index] = { ...blog, likes: blog.likes! + 1 };
      }
    },

    removeBlogById: (state: IBlog[], action: PayloadAction<string>) => {
      return state.filter((blog) => blog.id !== action.payload);
    },

    removeCommentFromBlog: (state: IBlog[], action: PayloadAction<IComment>) => {
      const blogIndex = state.findIndex((blog) => blog.id === (action.payload.blog as IBlog).id);
      const commentIndex = state[blogIndex].comments!.findIndex((comment) => comment.id === action.payload.id);

      state[blogIndex].comments!.splice(commentIndex, 1);
    }
  },
});

export const { setBlogs, addBlog, likeBlogById, addCommentToBlog, removeBlogById, removeCommentFromBlog } = blogSlice.actions;

export const initializeBlogs = () => async (dispatch: AppThunkDispatch) => {
  const blogs = await blogService.getAll();
  dispatch(setBlogs(blogs));
};

export const createBlog = (blog: IBlog) => async (dispatch: AppThunkDispatch) => {
  try {
    const newBlog = await blogService.create(blog);
    dispatch(addBlog(newBlog));
    dispatch(addBlogToUser({ id: newBlog.user!.id!, blog: newBlog }));
    dispatch(setNotification({
      type: "ok",
      message: `A new blog ${newBlog.title} by ${newBlog.author} added`,
    }));
  } catch (error) {
    if (isAxiosError(error)) {
      dispatch(setAxiosErrorMessage(error));
    } else {
      console.log(error);
    }
  }
};

export const createCommentInBlog = (comment: IComment) => async (dispatch: AppThunkDispatch) => {
  try {
    const newComment = await blogService.createComment(comment);
    dispatch(addCommentToBlog(newComment));
    dispatch(setNotification({
      type: "ok",
      message: "A new comment added",
    }));
  } catch (error) {
    if (isAxiosError(error)) {
      dispatch(setAxiosErrorMessage(error));
    } else {
      console.log(error);
    }
  }
};

export const likeBlog = (blog: IBlog) => async (dispatch: AppThunkDispatch) => {
  const updatedBlog = await blogService.update(blog.id!, {
    likes: blog.likes! + 1,
  });
  dispatch(likeBlogById(updatedBlog.id!));
};

export const removeBlog = (blog: IBlog) => async (dispatch: AppThunkDispatch) => {
  try {
    await blogService.remove(blog.id!);
    dispatch(removeBlogById(blog.id!));
    dispatch(removeBlogFromUser({ id: blog.user!.id!, blogId: blog.id! }));
    dispatch(setNotification({
      type: "ok",
      message: `Blog ${blog.title} by ${blog.author || ""} deleted succesfully`
    }));
  } catch (error) {
    if (isAxiosError(error)) {
      dispatch(setAxiosErrorMessage(error));
    } else {
      console.log(error);
    }
  }
};

export const deleteComment = (comment: IComment) => async (dispatch: AppThunkDispatch) => {
  try {
    await blogService.removeComment(comment);
    dispatch(removeCommentFromBlog(comment));
    dispatch(setNotification({
      type: "ok",
      message: "Comment deleted",
    }));
  } catch (error) {
    if (isAxiosError(error)) {
      dispatch(setAxiosErrorMessage(error));
    } else {
      console.log(error);
    }
  }
};

export default blogSlice.reducer;