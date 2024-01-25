import { useDispatch } from "react-redux";
import { IBlog } from "../interfaces/blog";
import { loginResponse } from "../interfaces/login";
import { removeBlog } from "../reducers/blogs";
import { useNavigate } from "react-router-dom";
import { AppThunkDispatch } from "../interfaces/reducers";
import { Button } from "react-bootstrap";
import "./styles/DeleteBlogBtn.css";

interface IBlogProps {
  blog: IBlog;
  loginUser: loginResponse | null;
}

const DeleteBlogBtn = ({ blog, loginUser }: IBlogProps) => {
  const dispatch = useDispatch<AppThunkDispatch>();
  const navigate = useNavigate();

  const remove = () => {
    navigate("/");
    void dispatch(removeBlog(blog));
  };

  if (!(blog.user?.username === loginUser?.username)) {
    return (
      <>
      </>
    );
  }
  return (
    <Button className="btn-deleteBlog m-2 col" variant="danger" onClick={() => void remove()}>
      Delete
    </Button>
  );
};

export default DeleteBlogBtn;