import { useSelector } from "react-redux";

const WithGuard = (Component) => {
  const Wrapper = (props) => {
    const {isLogged} = useSelector(state => state.auth)
    return isLogged ? <Component/> : 'Please Login First!';
  };
  return Wrapper;
};

export default WithGuard;
