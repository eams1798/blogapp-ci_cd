import axios from "axios";
import { IBlog, UpdatableBlogParameters } from "../interfaces/blog";
import storageService from "./storage";
import { IComment } from "../interfaces/comment";
const baseUrl = "/api/blogs";

const config = () => ({
  headers: {
    Authorization: storageService.getLoggedUser() ?
      `Bearer ${storageService.getToken()}` : null
  }
});

const getAll = async (): Promise<IBlog[]> => {
  console.log(`connecting to ${baseUrl}`);
  try {
    const response = await axios.get<IBlog[]>(baseUrl);
    return response.data.reverse();
  } catch {
    console.error;
    return [];
  }
};

const getComments = async (blogId: string): Promise<IComment[]> => {
  try {
    const response = await axios.get<IComment[]>(`${baseUrl}/${blogId}/comments`);
    return response.data;
  } catch {
    console.error;
    return [];
  }
};

const create = async (newBlog: IBlog): Promise<IBlog> => {
  const { data }: { data: IBlog } = await axios.post(baseUrl, newBlog, config());

  return data;
};

const createComment = async (comment: IComment): Promise<IComment> => {
  let response;

  if (comment.user) {
    response = await axios.post(`${baseUrl}/${comment.blog as string}/comments`, comment, config());
  } else {
    response = await axios.post(`${baseUrl}/${comment.blog as string}/comments/asAnonymous`, comment);
  }

  return response.data as IComment;
};

const update = async (
  blogId: string,
  parameters: UpdatableBlogParameters,
): Promise<IBlog> => {
  const { data }: { data: IBlog } = await axios.put(
    `${baseUrl}/${blogId}`,
    parameters,
    config(),
  );

  return data;
};
const remove = async (blogId: string): Promise<void> => {
  await axios.delete(`${baseUrl}/${blogId}`, config());
};

const removeComment = async (comment: IComment): Promise<void> => {
  await axios.delete(`${baseUrl}/${(comment.blog as IBlog).id}/comments/${comment.id!}`, config());
};

export default { getAll, getComments,create, createComment, update, remove, removeComment };
