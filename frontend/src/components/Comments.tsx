import { useEffect, useState } from "react";
import { IComment } from "../interfaces/comment";
import { loginResponse } from "../interfaces/login";
import blogService from "../services/blogs";
import "./styles/Comments.css";
import CommentForm from "./CommentForm";
import { IUser } from "../interfaces/user";
import Comment from "./Comment";

interface ICommentsProps {
  blogId: string;
  loginUser: loginResponse | null;
  comments: IComment[];
}

const Comments = ({ blogId, loginUser, comments }: ICommentsProps) => {
  const [commentUsers, setCommentUsers] = useState<IUser[]>([]);

  useEffect(() => {
    const fetchComments = async (): Promise<void> => {
      try {
        const data = (await blogService.getComments(blogId));
        const usersData = [];
        for (const element of data) {
          if (element.user) {
            usersData.push(element.user as IUser);
          }
        }
        setCommentUsers(usersData);
      } catch (error) {
        console.error(error);
      }
    };
    void fetchComments();

  }, [blogId, comments]);

  return (
    <div className="blog-comments container">
      <CommentForm blogId={blogId} loginUser={loginUser} />
      {comments.length > 0?
        <>
          <h2>Comments</h2>
          <ul>
            {comments.map((comment) => (
              <li key={comment.id} className="comment-li border border-secondary-subtle container py-2">
                <Comment
                  blogId={blogId}
                  comment={comment}
                  loginUser={loginUser}
                  commentUsers={commentUsers}
                />
              </li>
            ))}
          </ul>
        </>
        : <h2>No comments</h2>}
    </div>
  );
};

export default Comments;