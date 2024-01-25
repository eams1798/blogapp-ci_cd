import { IComment } from "./comment";
import { IUser } from "./user";

export interface IBlog {
  title: string;
  author?: string;
  url: string;
  likes?: number;
  user?: IUser;
  id?: string;
  comments?: IComment[];
}

export interface UpdatableBlogParameters {
  title?: string;
  author?: string;
  url?: string;
  likes?: number;
  comments?: IComment[];
}
