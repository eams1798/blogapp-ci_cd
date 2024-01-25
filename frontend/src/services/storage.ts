import { loginResponse } from "../interfaces/login";

const KEY = "loggedBlogAppUser";

const saveLoggedUser = (user: loginResponse) => {
  window.localStorage.setItem(KEY, JSON.stringify(user));
};

const getLoggedUser = (): loginResponse | null => {
  const loggedUserJSON = window.localStorage.getItem(KEY);
  if (loggedUserJSON) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return JSON.parse(loggedUserJSON);
  } else {
    return null;
  }
};

const getToken = (): string => {
  return getLoggedUser()!.token;
};

const removeLoggedUser = () => {
  window.localStorage.clear();
};

export default {
  saveLoggedUser, getLoggedUser, getToken, removeLoggedUser
};