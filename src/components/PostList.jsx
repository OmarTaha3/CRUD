import React from "react";
import { Table } from "react-bootstrap";
import PostListItem from "./PostListItem";
import LoadingHandler from "./LoadingHandler";

const PostList = ({ data, loading, error, deleteRecord, isLogged }) => {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th style={{ width: "70%" }}>Title</th>
          <th style={{ width: "10%" }}></th>
        </tr>
      </thead>
      <tbody>
        <LoadingHandler loading={loading} error={error}>
          <PostListItem
            data={data}
            deleteRecord={deleteRecord}
            isLogged={isLogged}
          />
        </LoadingHandler>
      </tbody>
    </Table>
  );
};

export default React.memo(PostList);
