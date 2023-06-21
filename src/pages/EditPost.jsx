import usePostDetails from "../hooks/use-post-details";
import LoadingHandler from "../components/LoadingHandler";
import { Form, Button } from "react-bootstrap";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { editPost, clearPost } from "../state/postSlice";
import { useNavigate } from "react-router";
import WithGuard from "../util/withGuard";
import { useFormik } from "formik";
import { postSchema } from "../util/validationSchema";

const EditPost = () => {
  const { loading, error, post } = usePostDetails();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(clearPost());
    };
  }, [dispatch]);

  const formik = useFormik({
    initialValues: {
      title:  "",
      description: "",
    },
    validationSchema: postSchema,
    onSubmit: (values) => {
      dispatch(
        editPost({
          id: post.id,
          title: values.title,
          description: values.description,
        })
      )
        .unwrap()
        .then(() => navigate("/"))
        .catch();
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

export default WithGuard(EditPost);
