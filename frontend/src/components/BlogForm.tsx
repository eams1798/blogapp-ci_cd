import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { AppThunkDispatch } from "../interfaces/reducers";
import { createBlog } from "../reducers/blogs";
import { Form, Button } from "react-bootstrap";

const BlogForm = ({ toggleVisibility }: { toggleVisibility: () => void}) => {
  const [title, setTitle] = useState<string>("");
  const [url, setURL] = useState<string>("");
  const [author, setAuthor] = useState<string>("");
  const [likes, setLikes] = useState<number>(0);

  const dispatch = useDispatch<AppThunkDispatch>();

  const addBlog = (e: React.FormEvent) => {
    e.preventDefault();
    const blogObject = { title, url, author, likes };

    void dispatch(createBlog(blogObject));

    setTitle("");
    setAuthor("");
    setURL("");
    setLikes(0);

  };

  const handleFieldChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: string,
  ) => {
    if (field === "title") setTitle(e.target.value);
    if (field === "url") setURL(e.target.value);
    if (field === "author") setAuthor(e.target.value);
    if (field === "likes") setLikes(parseInt(e.target.value));
  };

  return (
    <Form id="form-addBlog" onSubmit={(e) => { e.preventDefault(); addBlog(e); }}>
      <Form.Group controlId="formTitle">
        <Form.Label>Title</Form.Label>
        <Form.Control
          type="text"
          value={title}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleFieldChange(e, "title")}
        />
      </Form.Group>
      <Form.Group controlId="formAuthor">
        <Form.Label>Author</Form.Label>
        <Form.Control
          type="text"
          value={author}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleFieldChange(e, "author")}
        />
      </Form.Group>
      <Form.Group controlId="formURL">
        <Form.Label>URL</Form.Label>
        <Form.Control
          type="text"
          value={url}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleFieldChange(e, "url")}
        />
      </Form.Group>
      <Form.Group controlId="formLikes">
        <Form.Label>Likes</Form.Label>
        <Form.Control
          type="number"
          value={likes}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleFieldChange(e, "likes")}
        />
      </Form.Group>
      <div className="form-buttons d-flex container">
        <Button className="col-xs-6 m-2" variant="primary" type="submit">
          Add Blog
        </Button>
        <Button className="col-xs-6 m-2" variant="primary" onClick={() => toggleVisibility()}>Cancel</Button>
      </div>
    </Form>
  );
};

export default BlogForm;
