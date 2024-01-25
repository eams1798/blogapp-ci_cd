import { useRef } from "react";
import { loginResponse } from "../interfaces/login";
import { useDispatch } from "react-redux";
import { AppThunkDispatch } from "../interfaces/reducers";
import { createCommentInBlog } from "../reducers/blogs";
import { Form, Button, InputGroup, FormControl, Row, Col } from "react-bootstrap";

interface ICommentFormProps {
  blogId: string;
  loginUser: loginResponse | null;
}

const CommentForm = ({ blogId, loginUser }: ICommentFormProps) => {
  const contentRef = useRef<HTMLInputElement>(null);
  const isAnonymousRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const content = contentRef.current!.value;
    const isAnonymous = isAnonymousRef.current!.checked;

    if (isAnonymous) {
      const comment = { content, blog: blogId };
      void dispatch(createCommentInBlog(comment));
    } else {
      const comment = { content: content, blog: blogId, user: loginUser! };
      void dispatch(createCommentInBlog(comment));
    }
    contentRef.current!.value = "";
  };

  const dispatch = useDispatch<AppThunkDispatch>();
  return (
    <Form onSubmit={handleSubmit} className="container">
      <Row className="mb-3">
        <Col>
          <InputGroup>
            <FormControl
              placeholder="Enter your comment..."
              aria-label="Comment"
              aria-describedby="basic-addon2"
              ref={contentRef}
            />
          </InputGroup>
        </Col>
      </Row>
      <Row className="mb-3 row d-flex align-items-center">
        <Col sm="8" md="10">
          <Form.Group controlId="formBasicCheckbox">
            <Form.Check
              type="checkbox"
              label="Post as anonymous"
              ref={isAnonymousRef}
              disabled={!loginUser}
            />
          </Form.Group>
        </Col>
        <Col sm="auto">
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default CommentForm;