import { useState } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const RequireAuth = () => {
    const [isAuth, setIsAuth] = useState(false);
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
        if (user) {
            setIsAuth(true);
        } else {
            setIsAuth(false);
        }
    })
    return isAuth ? <Outlet/> : <Navigate to="/"/>
}

export default RequireAuth;
