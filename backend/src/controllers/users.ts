import bcrypt from "bcrypt";
import express, { NextFunction } from "express";
import { Request, Response } from "express";
import User from "../models/user";
import Comment from "../models/comment";
import "express-async-errors";

const usersRouter = express.Router();

usersRouter.get("/", async (req: Request, res: Response) => {
  const users = await User
    .find({})
    .populate("blogs", {
      title: 1,
      author: 1,
      url: 1,
      likes: 1
    });

  res.json(users);
});

usersRouter.get("/:id", async (req: Request, res: Response, next: NextFunction) => {
  const user = await User.findById(req.params.id);
  if (user) {
    res.json(user.toJSON());
  } else {
    next();
  }
});

usersRouter.get("/:id/comments", async (req: Request, res: Response) => {
  const comments = await Comment
    .find({ user: req.params.id })
    .populate("blog", { title: 1, author: 1 });
  res.json(comments.map(comment => comment.toJSON()));
});

usersRouter.post("/", async (req: Request, res: Response) => {
  const body = req.body;

  if (!body.username || !body.password) {
    return res.status(400).json({
      error: "Missing username or password"
    });
  } else if (body.password.length < 3) {
    return res.status(400).json({
      error: "Weak password"
    });
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(body.password, saltRounds);

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash
  });

  const savedUser = await user.save();

  res.json(savedUser);
});

export default usersRouter;
