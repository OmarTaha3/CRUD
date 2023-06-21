import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
import { changeLog } from "../state/authSlice";
const Header = () => {
  const { isLogged } = useSelector((state) => state.auth);
  const dispatch = useDispatch()
  return (
    <div className="header">
      <h1>CRUD APP</h1>
      <ul className="nav">
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to="post/add">Add Post</NavLink>
        </li>
        <li className="login" style={{cursor:'pointer'}} onClick={() => dispatch(changeLog())}>
          {isLogged ? "LogOut" : "LogIn"}
        </li>
      </ul>
    </div>
  );
};

export default Header;
