import { IBlog } from "../interfaces/blog";
import { AppThunkDispatch } from "../interfaces/reducers";
import { likeBlog } from "../reducers/blogs";
import { useDispatch } from "react-redux";
import "./styles/Blog.css";
import { loginResponse } from "../interfaces/login";
import DeleteBlogBtn from "./DeleteBlogBtn";
import Comments from "./Comments";
import { Button } from "react-bootstrap";

interface IBlogProps {
  id?: string;
  blog: IBlog;
  loginUser: loginResponse | null;
}

const Blog = ({ id, blog, loginUser }: IBlogProps) => {

  const dispatch = useDispatch<AppThunkDispatch>();

  return (
    <div id={id} className="blog pt-5">
      <ul className="blog-content">
        <div className="blog-title-container d-flex align-items-center">
          <h3 className="col-5 col-sm-8 col-md-10">{blog.title}</h3>
          <div className="col-2">
            <DeleteBlogBtn blog={blog} loginUser={loginUser} />
          </div>
        </div>
        <li>Author: {blog.author}</li>
        <li>URL: {blog.url}</li>
        <li className="d-flex align-items-center">
          <span className="col-5 col-sm-8 col-md-10">Likes: {blog.likes}</span>
          {loginUser ? (
            <Button className="mx-2 btn-like" variant="primary" onClick={() => void dispatch(likeBlog(blog))}>
              Like
            </Button>
          ) : (
            <></>
          )}
        </li>
      </ul>
      <Comments blogId={blog.id!} loginUser={loginUser} comments={blog.comments!}/>
    </div>
  );
};

export default Blog;
