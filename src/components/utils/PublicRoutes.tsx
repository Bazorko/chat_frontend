import { useState } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const PublicRoutes = () => {
    const [isAuth, setIsAuth] = useState(false);
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
        if (!user) {
            setIsAuth(false);
        } else {
            setIsAuth(true);
        }
    })
    return isAuth ? <Outlet/> : <Navigate to="/"/>
}

export default PublicRoutes;