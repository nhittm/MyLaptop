import { Outlet } from "react-router";
import { useSelector } from "react-redux";
import { Navigate } from 'react-router-dom'

const ProtectedRoute = () => {
    let token = useSelector(state => state.auth.token);
    let user = useSelector(state => state.auth.user);
    if (!token)  return <Navigate to="/dangnhap"/>
  else if (user.role!==1) return <Navigate to="/dangnhap"/>
  else return ( <></>);   // ok cho qua
};
export default ProtectedRoute;