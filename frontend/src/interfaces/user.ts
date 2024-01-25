import { IBlog } from "./blog";

export interface IUser {
  username: string;
  name: string;
  id?: string;
  blogs?: IBlog[];
}

export interface updatableUserParameters {
  username?: string;
  name?: string;
  blogs?: IBlog[];
  id: string;
}
