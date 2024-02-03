import "@testing-library/jest-dom/extend-expect";
import {
  RenderResult,
  fireEvent,
  /* prettyDOM,  */ render,
} from "@testing-library/react";
import Blog from "../src/components/Blog";
import { IBlog } from "../src/interfaces/blog";
import { loginResponse } from "../src/interfaces/login";

import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import { AppState } from "../src/interfaces/reducers";
import { MemoryRouter } from 'react-router-dom';

const middlewares = [thunk];
const mockStore = configureMockStore<AppState>(middlewares);

describe("Tests for Blog component", () => {
  let store: ReturnType<typeof mockStore>,
    blog: IBlog,
    user: loginResponse,
    setNotification: jest.Mock,
    blogComponent: RenderResult;

  beforeEach(() => {
    store = mockStore({
      blogs: [{
        title: "Component testing is done with react-testing-library",
        author: "Robert C. Martin",
        url: "https://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.html",
        likes: 10,
        user: {
          name: "Robert C. Martin",
          username: "UncleBob",
        },
        id: "test-blog",
        comments: [{
          id: "test-comment",
          content: "Test comment",
          blog: "test-blog",
          user: "UncleBob",
        }],
      }],
      users: [{
        name: "Robert C. Martin",
        username: "UncleBob",
      }],
      notification: {
        message: "",
        type: null
      },
      loginUser: {
        "token": "bearer 1234567890",
        "username": "root",
        "name": "root"
      },
    });
    blog = {
      title: "Component testing is done with react-testing-library",
      author: "Robert C. Martin",
      url: "https://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.html",
      likes: 10,
      user: {
        name: "Robert C. Martin",
        username: "UncleBob",
      },
    };
    user = {
      name: "Robert C. Martin",
      username: "UncleBob",
      token: "bearer 1234567890",
    };
    setNotification = jest.fn();

    blogComponent = render(
      <Provider store={store}>
        <MemoryRouter>
          <Blog
            id="test-blog"
            blog={blog}
            loginUser={user}
          />
        </MemoryRouter>
      </Provider>
    );
  });

  test("Blog component must show title and author's blog, but don't show URL and likes counting when toggled off", () => {
    const visibleComponent = blogComponent.container.querySelector(
      ".togglable-container :not([style*='display:none'])",
    )!;

    expect(visibleComponent).toHaveTextContent(
      `${blog.title} by ${blog.author || ""}`,
    );
    expect(visibleComponent).not.toHaveTextContent(`${blog.url}`);
    expect(visibleComponent).not.toHaveTextContent(`${blog.likes || 0}`);
  });

  test("Author, URL and likes are shown when Blog component is toggled on (its togglable open button is pressed)", () => {
    const showButton = blogComponent.container.querySelector(".btn-show")!;
    fireEvent.click(showButton);

    setTimeout(() => {
      const visibleComponent = blogComponent.container.querySelector(
        ".togglable-container :not([style*='display:none'])",
      )!;
      expect(visibleComponent).toHaveTextContent(
        `${blog.title} by ${blog.author || ""}`,
      );
      expect(visibleComponent).toHaveTextContent(`${blog.url}`);
      expect(visibleComponent).toHaveTextContent(`${blog.likes || 0}`);
    }, 1000);
  });

  test("An event handler is called 2 times when .btn-like is pressed 2 times", () => {
    const likeButton = blogComponent.container.querySelector(".btn-like")!;
    fireEvent.click(likeButton);
    fireEvent.click(likeButton);
    expect(setNotification).toHaveBeenCalledTimes(2);
  });
});
