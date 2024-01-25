import { useEffect } from "react";
import { loginResponse } from "./interfaces/login";
import UserInterface from "./components/UserInterface";
import Notification from "./components/Notification";
import { useDispatch, useSelector } from "react-redux";
import { AppState, AppThunkDispatch } from "./interfaces/reducers";
import { initializeBlogs } from "./reducers/blogs";
import { loadLoginUser } from "./reducers/loginUser";
import "./App.css";
import { loadUsers } from "./reducers/users";
import { isAxiosError } from "axios";
import { setAxiosErrorMessage } from "./reducers/notification";
import { Container } from "react-bootstrap";

const App = () => {
  const dispatch = useDispatch<AppThunkDispatch>();

  const user = useSelector<AppState, loginResponse | null>((state) => state.loginUser);

  useEffect(() => {
    try {
      void dispatch(initializeBlogs());
      void dispatch(loadUsers());
    } catch (error) {
      if (isAxiosError(error)) {
        dispatch(setAxiosErrorMessage(error));
      } else {
        console.log(error);
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    dispatch(loadLoginUser());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container>
      <Notification />
      <UserInterface loginUser={user} />
    </Container>
  );
};

export default App;
