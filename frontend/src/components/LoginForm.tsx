import { useRef, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setAxiosErrorMessage } from "../reducers/notification";
import { AppThunkDispatch } from "../interfaces/reducers";
import { login } from "../reducers/loginUser";
import { Form, Button } from "react-bootstrap";
import Togglable, { TogglableRef } from "./Togglable";
import "./styles/LoginForm.css";

const LoginForm = ({ toggleVisibility }: { toggleVisibility: () => void}) => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const dispatch = useDispatch<AppThunkDispatch>();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    try {
      void dispatch(login({ username, password }));
      setUsername("");
      setPassword("");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        dispatch(setAxiosErrorMessage(error));
      } else {
        console.log(error);
      }
    }
  };

  return (
    <Form className="login-form bg-light" onSubmit={(e) => { e.preventDefault(); handleLogin(e); }}>
      <Form.Group controlId="formUsername">
        <Form.Label>Username</Form.Label>
        <Form.Control
          type="text"
          value={username}
          onChange={({ target }) => setUsername(target.value)}
        />
      </Form.Group>
      <Form.Group controlId="formPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        />
      </Form.Group>
      <div className="form-buttons d-flex justify-content-evenly">
        <Button variant="primary" type="submit" id="btn-login">
          Login
        </Button>
        <Button variant="primary" onClick={() => toggleVisibility()}>Cancel</Button>
      </div>
    </Form>
  );
};

const Login = () => {
  const togglableRef = useRef<TogglableRef>(null);
  return (
    <Togglable openButtonLabel="Login" closeButtonLabel="_nobutton" ref={togglableRef}>
      <></>
      <div className="responsive-controller">
        <LoginForm toggleVisibility={() => togglableRef.current!.toggleVisibility()} />
      </div>
    </Togglable>
  );
};

export default Login;
