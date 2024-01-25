import { Types } from "mongoose";

export interface IComment {
  content: string,
  user?: Types.ObjectId | string
  blog: Types.ObjectId | string
}