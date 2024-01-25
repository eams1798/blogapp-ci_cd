import express from "express";
import { Response, NextFunction } from "express";
import middleware from "../utils/middleware";
import { Request } from "../interfaces/expressHelper";
import Blog from "../models/blog";
import Comment from "../models/comment";
import "express-async-errors";

const blogRouter = express.Router();

blogRouter.get("/", async (request: Request, response: Response) => {
  const blogs = await Blog
    .find({})
    .populate("user", { username: 1, name: 1 })
    .populate("comments", { content: 1, user: 1 });
  response.json(blogs.map(blog => blog.toJSON()));
});

blogRouter.get("/:id", async (request: Request, response: Response, next: NextFunction) => {
  const blog = await Blog
    .findById(request.params.id)
    .populate("user", { username: 1, name: 1 })
    .populate("comments", { content: 1, user: 1 });
  if (blog) {
    response.json(blog.toJSON());
  } else {
    next();
  }
});

blogRouter.get("/:id/comments", async (request: Request, response: Response) => {
  const comments = await Comment
    .find({ blog: request.params.id })
    .populate("user", { username: 1, name: 1 });
  response.json(comments.map(comment => comment.toJSON()));
});

blogRouter.post("/", middleware.userExtractor, async (request: Request, response: Response) => {
  const body = request.body;
  const user = request.user;

  if (!body.title || !body.url) {
    return response.status(400).json({
      error: "title or url missing"
    });
  }

  if (!user) {
    return response.status(404).json({
      error: "user not found"
    });
  }

  const blog = new Blog({
    title: body.title,
    author: body.author? body.author: user.name,
    url: body.url,
    likes: body.likes || 0,
    user: user._id
  });

  const savedBlog = await blog.save();
  user.blogs = user.blogs.concat(savedBlog.id);
  await user.save();
  const returnedBlog = await savedBlog.populate("user", { username: 1, name: 1 });
  response.status(201).json(returnedBlog.toJSON());
});

blogRouter.post("/:id/comments/asAnonymous", async (request: Request, response: Response) => {
  const blog = await Blog.findById(request.params.id);

  if (!blog) {
    return response.status(404).json({
      error: "blog not found"
    });
  }
  const body = request.body;

  if (!body.content) {
    return response.status(400).json({
      error: "content missing"
    });
  }

  const comment = new Comment({
    content: body.content,
    blog: blog._id
  });

  const savedComment = await comment.save();

  blog.comments = blog.comments.concat(comment._id);
  await blog.save();

  const returnedComment = await savedComment.populate("blog", { title: 1, author: 1 });
  response.status(201).json(returnedComment.toJSON());
});

blogRouter.post("/:id/comments/", middleware.userExtractor, async (request: Request, response: Response) => {
  const blog = await Blog.findById(request.params.id);

  if (!blog) {
    return response.status(404).json({
      error: "blog not found"
    });
  }
  const body = request.body;

  if (!body.content) {
    return response.status(400).json({
      error: "content missing"
    });
  }

  const user = request.user;

  if (!user) {
    return response.status(404).json({
      error: "user not found"
    });
  }

  const comment = new Comment({
    content: body.content,
    blog: blog._id,
    user: user? user._id : ""
  });

  const savedComment = await comment.save();
  user.comments = user.comments.concat(comment._id);
  await user.save();

  blog.comments = blog.comments.concat(comment._id);
  await blog.save();

  let returnedComment = await savedComment
    .populate("user", { username: 1, name: 1 });
  returnedComment = await returnedComment.populate("blog", { title: 1, author: 1 });
  response.status(201).json(returnedComment.toJSON());
});

blogRouter.put("/:id", middleware.userExtractor, async (request: Request, response: Response, next: NextFunction) => {
  const body = request.body;
  const user = request.user;
  const blog = await Blog.findById(request.params.id);
  if (!blog) {
    return response.status(404).json({ error: "Blog not found" });
  }
  if (!user) {
    return response.status(404).json({
      error: "User not found"
    });
  }
  if (blog.user.toString() !== user.id?.toString() && !(Object.keys(body).includes("likes"))) {
    return response.status(403).json({ error : "Only the creator can edit the blog" });
  }

  const updatedFields = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  };

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, updatedFields, { new: true });
  if (updatedBlog) {
    const returnedBlog = await updatedBlog.populate("user", { username: 1, name: 1 });
    response.json(returnedBlog.toJSON());
  } else {
    next();
  }
});

blogRouter.delete("/:id", middleware.userExtractor, async (request: Request, response: Response, next: NextFunction) => {
  const user = request.user;

  if (!user) {
    return response.status(404).json({ error: "User not found" });
  }

  const blog = await Blog.findById(request.params.id);
  if (!blog) {
    return response.status(404).json({ error: "Blog not found" });
  }

  if (blog.user.toString() !== user.id?.toString()) {
    return response.status(403).json({ error: "Only the creator can delete the blog" });
  }

  const result = await blog.deleteOne();
  if (result) {
    response.status(204).end();
  } else {
    next();
  }
});

blogRouter.delete("/:id/comments/:commentId", middleware.userExtractor, async (request: Request, response: Response, next: NextFunction) => {
  const user = request.user;

  if (!user) {
    return response.status(404).json({ error: "User not found" });
  }

  const blog = await Blog.findById(request.params.id);
  if (!blog) {
    return response.status(404).json({ error: "Blog not found" });
  }

  const comment = await Comment.findById(request.params.commentId);
  if (!comment) {
    return response.status(404).json({ error: "Comment not found" });
  }

  if ( !comment.user || comment.user.toString() !== user.id?.toString()) {
    return response.status(403).json({ error: "Only the comment owner can delete the comment" });
  }

  const result = await comment.deleteOne();
  if (result) {
    response.status(204).end();
  } else {
    next();
  }
});

export default blogRouter;
