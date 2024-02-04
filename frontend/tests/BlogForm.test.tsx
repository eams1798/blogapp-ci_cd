import "@testing-library/jest-dom/extend-expect";
import { RenderResult, fireEvent, render } from "@testing-library/react";
import BlogForm from "../src/components/BlogForm";

import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import { createBlog } from "../src/reducers/blogs";
import { AppState } from "../src/interfaces/reducers";

const middlewares = [thunk];
const mockStore = configureMockStore<AppState>(middlewares);

describe("Tests for BlogForm component", () => {
  let store: ReturnType<typeof mockStore>, blogForm: RenderResult, toggleVisibility: jest.Mock;

  beforeEach(() => {
    store = mockStore({
      blogs: [],
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
    toggleVisibility = jest.fn();
    blogForm = render(
      <Provider store={store}>
        <BlogForm toggleVisibility={toggleVisibility} />
      </Provider>
    );
  });

  test("BlogForm component dispatches createBlog action with new blog details on submit", () => {
    const titleField = blogForm.container.querySelector("input#formTitle") || new Element();
    const authorField = blogForm.container.querySelector("input#formAuthor") || new Element();
    const urlField = blogForm.container.querySelector("input#formURL") || new Element();
    const likesField = blogForm.container.querySelector("input#formLikes") || new Element();
    const form = blogForm.container.querySelector("#form-addBlog") || new Element();

    fireEvent.change(titleField, { target: { value: "My new blog" } });
    fireEvent.change(authorField, { target: { value: "Robert C. Martin" } });
    fireEvent.change(urlField, { target: { value: "https://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.html" } });
    fireEvent.change(likesField, { target: { value: "5" } });

    fireEvent.submit(form);

    setTimeout(() => {
      const actions = store.getActions();
      expect(actions[0]).toEqual(createBlog({
        title: "My new blog",
        author: "Robert C. Martin",
        url: "https://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.html",
        likes: 5
      }));
    }, 3000);

  });
});
