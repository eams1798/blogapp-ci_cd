import { Link } from "react-router-dom";
import { loginResponse } from "../interfaces/login";
import { useDispatch } from "react-redux";
import { AppThunkDispatch } from "../interfaces/reducers";
import { logout } from "../reducers/loginUser";
import { Navbar, Nav, Button } from "react-bootstrap";
import "./styles/Menu.css";
import Login from "./LoginForm";

interface IMenuProps {
  user: loginResponse | null
}
const Menu = ({ user }: IMenuProps) => {
  const dispatch = useDispatch<AppThunkDispatch>();

  return (
    <Navbar expand="lg" className="container menu">
      <Navbar.Brand href="/">BlogApp</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" className="mx-3" />
      <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
        <Nav className="mr-auto">
          <Nav.Link as={Link} to="/" className="m-2">Blogs</Nav.Link>
          <Nav.Link as={Link} to="/users" className="m-2">Users</Nav.Link>
          {user ? (
            <Nav.Item className="login-info m-2">
              <span>{user.name} logged in</span>
              <Button onClick={() => dispatch(logout())}>Logout</Button>
            </Nav.Item>
          ): (
            <Nav.Item className="m-2">
              <Login />
            </Nav.Item>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Menu;