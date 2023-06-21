import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { getPost } from "../state/postSlice";

const usePostDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { loading, error, post } = useSelector((state) => state.posts);
  useEffect(() => {
    dispatch(getPost(id));
  }, [dispatch, id]);

  return {loading , error, post};
};

export default usePostDetails;
