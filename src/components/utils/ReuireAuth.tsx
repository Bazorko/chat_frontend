import { Outlet, Navigate } from "react-router-dom";

const ReuireAuth = () => {
    const isAuth = false;
    return isAuth ? <Outlet/> : <Navigate to="/"/>;
}

export default ReuireAuth;
