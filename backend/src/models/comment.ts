import { Schema, model } from "mongoose";
import { IComment } from "../interfaces/comments";

const commentSchema = new Schema<IComment>({
  content: { type: String, required: true },
  user: { type: Schema.Types.ObjectId, ref: "User" },
  blog: { type: Schema.Types.ObjectId, ref: "Blog", required: true },
});

commentSchema.set("toJSON", {
  transform: (_doc_, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Comment = model<IComment>("Comment", commentSchema);

export default Comment;