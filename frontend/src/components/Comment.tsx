import { IComment } from "../interfaces/comment";
import { loginResponse } from "../interfaces/login";
import { IUser } from "../interfaces/user";
import DeleteCommentBtn from "./DeleteCommentBtn";

interface ICommentProps {
  blogId: string;
  comment: IComment;
  loginUser: loginResponse | null;
  commentUsers: IUser[];
}

const Comment = ({ blogId, comment, loginUser, commentUsers }: ICommentProps) => {
  if (!comment.user || commentUsers.length === 0) {
    return (
      <div className="comment d-flex">
        <p className="my-2">{comment.content}</p>
      </div>
    );
  }
  if ( typeof comment.user !== "string") {
    return (
      <div className="comment d-flex align-items-center">
        <p className="col-sm-8 col-md-10 my-2">{comment.content} <b>- Added by {comment.user?.name}</b></p>
        <DeleteCommentBtn blogId={blogId} comment={comment} loginUser={loginUser} />
      </div>
    );
  }
  const user = commentUsers.find((user) => user.id === comment.user);
  return (
    <div className="comment d-flex align-items-center">
      <p className="col-sm-8 col-md-10 my-2">{comment.content} <b>- Added by {user!.name}</b></p>
      <DeleteCommentBtn blogId={blogId} comment={{
        ...comment,
        user
      }} loginUser={loginUser} />
    </div>
  );
};

export default Comment;