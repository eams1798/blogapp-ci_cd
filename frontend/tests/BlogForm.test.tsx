import "@testing-library/jest-dom/extend-expect";
import { RenderResult, fireEvent, render } from "@testing-library/react";
import BlogForm from "../src/components/BlogForm";

describe("Tests for BlogForm component", () => {
  let blogForm: RenderResult, setBlogs: jest.Mock, setNotification: jest.Mock;

  beforeEach(() => {
    setBlogs = jest.fn();
    setNotification = jest.fn();
    blogForm = render(
      <BlogForm setBlogs={setBlogs} setNotification={setNotification} />,
    );
  });

  test("BlogForm compoment calls setBlogs with the details of the new blog on submit", () => {
    const titleField =
      blogForm.container.querySelector("input#title") || new Element();
    const authorField =
      blogForm.container.querySelector("input#author") || new Element();
    const urlField =
      blogForm.container.querySelector("input#url") || new Element();
    const likesField =
      blogForm.container.querySelector("input#likes") || new Element();
    const form = blogForm.container.querySelector("form") || new Element();

    fireEvent.change(titleField, { target: { value: "My new blog" } });
    fireEvent.change(authorField, { target: { value: "Robert C. Martin" } });
    fireEvent.change(urlField, {
      target: {
        value:
          "https://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.html",
      },
    });
    fireEvent.change(likesField, { target: { value: "5" } });

    fireEvent.submit(form);

    expect(setBlogs).toHaveBeenCalledTimes(1);
    expect(setBlogs).toHaveBeenCalledWith({
      title: "My new blog",
      author: "Robert C. Martin",
      url: "https://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.html",
      likes: 5,
    });
  });
});
