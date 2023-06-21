import React from "react";
import { Button, ButtonGroup } from "react-bootstrap";
import { Link,useNavigate } from "react-router-dom";


const PostListItem = ({ data, deleteRecord,isLogged }) => {

  const deleteHandler = (post) =>{
    if(window.confirm(`Do you really want to delete record: ${post.title}`)){
      deleteRecord(post.id);
    }
  }

  const navigate = useNavigate()

  const records = data.map((el, idx) => (
    <tr key={el.id}>
      <td>{`#${++idx}`}</td>
      <td>
        <Link to={`post/${el.id}`} style={{textDecoration:'none'}}>{el.title}</Link>
      </td>
      <td>
        <ButtonGroup aria-label="Basic example">
          <Button
            variant="primary"
            onClick={() => navigate(`post/${el.id}/edit`)}
          >
            Edit
          </Button>
          <Button
            variant="danger"
            onClick={() => {
              deleteHandler(el);
            }}
            disabled={!isLogged}
          >
            Delete
          </Button>
        </ButtonGroup>
      </td>
    </tr>
  ));
  return <>{records}</>;
};

export default PostListItem;
