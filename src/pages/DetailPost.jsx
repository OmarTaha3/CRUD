import usePostDetails from "../hooks/use-post-details";
import LoadingHandler from "../components/LoadingHandler";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { clearPost } from "../state/postSlice";

const DetailPost = () => {
  const { loading, error, post } = usePostDetails();
  const dispatch = useDispatch()

  useEffect(() => {
    return () => {
      dispatch(clearPost());
    };
  }, [dispatch]);


  return (
    <div>
      <LoadingHandler loading={loading} error={error}>
        <p>Title: {post.title}</p>
        <p>Description: {post.description}</p>
      </LoadingHandler>
    </div>
  );
};

export default DetailPost;
