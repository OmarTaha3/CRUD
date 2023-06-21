import React from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { insertPost } from "../state/postSlice";
import { useNavigate } from "react-router";
import LoadingHandler from "../components/LoadingHandler";
import WithGuard from "../util/withGuard";
import { useFormik } from "formik";
import { postSchema } from "../util/validationSchema";
const AddPost = () => {
  const { loading, error } = useSelector((state) => state.posts);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
    },
    validationSchema: postSchema,
    onSubmit: (values) => {
      const id = Math.floor(Math.random() * 100);
      dispatch(
        insertPost({ id, title: values.title, description: values.description })
      )
        .unwrap()
        .then(() => {
          navigate("/");
        })
        .catch((e) => {
          console.log(e);
        });
    },
  });

  return (
    <Form onSubmit={formik.handleSubmit}>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Title</Form.Label>
        <Form.Control
          type="text"
          name="title"
          onChange={formik.handleChange}
          value={formik.values.title}
          isInvalid={!!formik.errors.title}
        />
        <Form.Control.Feedback type="invalid">
          {formik.errors.title}
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>Description</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          name="description"
          onChange={formik.handleChange}
          value={formik.values.description}
          isInvalid={!!formik.errors.description}
        />
        <Form.Control.Feedback type="invalid">
          {formik.errors.description}
        </Form.Control.Feedback>
      </Form.Group>
      <LoadingHandler loading={loading} error={error}>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </LoadingHandler>
    </Form>
  );
};

export default WithGuard(AddPost);
