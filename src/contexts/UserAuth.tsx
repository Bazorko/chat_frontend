import { createContext, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";

interface UserAuthContextObject {
    isAuth: boolean
}

interface UserAuthContextProps {
    children: JSX.Element
}

export const AuthContext = createContext<UserAuthContextObject | undefined>(undefined);

export const AuthProvider = (props: UserAuthContextProps) => {
    const [user, setUser] = useState({});
    const [isAuth, setIsAuth] = useState(false);

    //Fetch user
    /*const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
        if (user) {
            setIsAuth(true);
        } else {
            setIsAuth(false);
        }
    })*/
    return(
        <AuthContext.Provider value={{ isAuth }}>
            {props.children }
        </AuthContext.Provider>
    );
}