import * as Yup from "yup";

export const postSchema = Yup.object().shape({
  title: Yup.string()
    .min(2, "Please insert 2 characters at Least!")
    .max(50, "Please insert 50 characters at maximum!")
    .required("Title is required!"),
  description: Yup.string().required("Description is required"),
});

