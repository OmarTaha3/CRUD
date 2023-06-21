import { useEffect, useCallback } from "react";
import PostList from "../components/PostList";
import { fetchPosts, deletePost } from "../state/postSlice";

import { useDispatch, useSelector } from "react-redux";

const Index = () => {
  const { records, loading, error } = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  const {isLogged} = useSelector(state => state.auth)

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  const deleteRecord = useCallback(
    (id) => {
      dispatch(deletePost(id));
    },
    [dispatch]
  );

  return (
    <PostList
      data={records}
      loading={loading}
      error={error}
      deleteRecord={deleteRecord}
      isLogged = {isLogged}
    />
  );
};

export default Index;
