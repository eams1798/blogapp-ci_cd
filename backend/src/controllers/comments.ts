import express from "express";
import { Response, NextFunction } from "express";
import { Request } from "../interfaces/expressHelper";
import Comment from "../models/comment";
import "express-async-errors";

const commentsRouter = express.Router();

commentsRouter.get("/", async (request: Request, response: Response) => {
  const comments = await Comment
    .find({})
    .populate("user", { username: 1, name: 1 })
    .populate("blog", { title: 1, author: 1 });
  response.json(comments.map(comment => comment.toJSON()));
});

commentsRouter.get("/:id", async (request: Request, response: Response, next: NextFunction) => {
  const comment = await Comment
    .findById(request.params.id)
    .populate("user", { username: 1, name: 1 })
    .populate("blog", { title: 1, author: 1 });
  if (comment) {
    response.json(comment.toJSON());
  } else {
    next();
  }
});

export default commentsRouter;