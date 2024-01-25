import { IBlog } from "./blog";
import { IUser } from "./user";

export interface IComment {
  id?: string;
  content: string;
  blog: IBlog | string;
  user?: IUser | string;
}