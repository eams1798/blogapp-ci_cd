import { IBlog } from "../interfaces/blog";
import Togglable, { TogglableRef } from "./Togglable";
import BlogForm from "./BlogForm";
import { Link } from "react-router-dom";
import { loginResponse } from "../interfaces/login";
import DeleteBlogBtn from "./DeleteBlogBtn";
import { useRef } from "react";
import { ListGroup, Badge } from "react-bootstrap";
import "./styles/BlogList.css";

interface IBlogListProps {
  loginUser: loginResponse | null;
  blogs: IBlog[];
}

const BlogList = ({ loginUser, blogs }: IBlogListProps) => {
  const togglableRef = useRef<TogglableRef>(null);
  return (
    <div id="blogs" className="pt-5">
      {loginUser?
        <Togglable className="mt-2 mb-2" openButtonLabel="New blog" closeButtonLabel="_nobutton" ref={togglableRef}>
          <></>
          <BlogForm toggleVisibility={() => togglableRef.current!.toggleVisibility()}/>
        </Togglable>
        : <></>}
      <ListGroup id="blog-list" className="mt-2 mb-2">
        {blogs.map((blog) => (
          <ListGroup.Item key={blog.id} id={blog.id} className="blog container d-flex justify-content-between align-items-center align-content-center">
            <Link className="m-2 col-xs-5" to={`/blogs/${blog.id}`}>{blog.title} by {blog.author}</Link>
            <div className="m-2 col-xs-6 d-flex align-items-center row flex-column-reverse flex-sm-row">
              <DeleteBlogBtn blog={blog} loginUser={loginUser} />
              <Badge className="bg-info n-comments col">{`${blog.comments?.length} comments`}</Badge>
            </div>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
};

export default BlogList;