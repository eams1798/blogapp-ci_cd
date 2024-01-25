import { useDispatch } from "react-redux";
import { AppThunkDispatch } from "../interfaces/reducers";
import { deleteComment } from "../reducers/blogs";
import { IComment } from "../interfaces/comment";
import { loginResponse } from "../interfaces/login";
import { IUser } from "../interfaces/user";
import { Button } from "react-bootstrap";

interface IBlogProps {
  blogId: string;
  comment: IComment;
  loginUser: loginResponse | null;
}

const DeleteCommentBtn = ({ blogId, comment, loginUser }: IBlogProps) => {
  const dispatch = useDispatch<AppThunkDispatch>();
  const userComment = comment.user as IUser;

  if (!comment.blog) {
    comment.blog = {
      id: blogId,
      title: "",
      author: "",
      url: "",
    };
  }

  if (!( comment.user && userComment.username === loginUser?.username)) {
    return (
      <>
      </>
    );
  }
  return (
    <Button className="btn-deleteComment" variant="danger" onClick={() => void dispatch(deleteComment(comment))} >
      Delete
    </Button>
  );
};

export default DeleteCommentBtn;