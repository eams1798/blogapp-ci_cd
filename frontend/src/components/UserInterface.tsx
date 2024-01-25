import { loginResponse } from "../interfaces/login";
import "./styles/UserInterface.css";
import Menu from "./Menu";
import { Route, Routes } from "react-router-dom";
import BlogList from "./BlogList";
import UserList from "./UserList";
import Blog from "./Blog";
import { useMatch } from "react-router-dom";
import { useSelector } from "react-redux";
import { AppState } from "../interfaces/reducers";
import { IBlog } from "../interfaces/blog";
import { IUser } from "../interfaces/user";
import User from "./User";
import NotFound from "./NotFound";

interface UIProps {
  loginUser: loginResponse | null;
}

const UserInterface = ({ loginUser }: UIProps) => {
  const blogs = useSelector<AppState, IBlog[]>((state) => [...state.blogs].sort(
    (a, b) => b.likes! - a.likes!,
  ));
  const users = useSelector<AppState, IUser[]>((state) => [...state.users]);

  const blogMatch = useMatch("/blogs/:id");
  const blog = blogMatch ? blogs.find((blog) => blog.id === blogMatch.params.id) : null;

  const userMatch = useMatch("/users/:id");
  const user = userMatch ? users.find((user) => user.id === userMatch.params.id) : null;
  return (
    <div className="user-interface d-flex flex-column">
      <div className="container fixed-top menu-container">
        <Menu user={loginUser}/>
      </div>
      <Routes>
        <Route path="/" element={<BlogList loginUser={loginUser} blogs={blogs} />} />
        <Route path="/blogs/:id" element={
          blog?
            <Blog key={blog.id} blog={blog} loginUser={loginUser} /> :
            <NotFound />
        } />
        <Route path="/users" element={<UserList users={users} />} />
        <Route path="/users/:id" element={
          user?
            <User key={user.id} user={user} /> :
            <NotFound />
        } />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default UserInterface;
