import { createContext, useState } from "react";
import { auth } from "../config/firebaseAuth";
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth";

interface UserAuthContextObject {
    isAuth: boolean
    signInUser: ({}: UserObject) => void
    createAccount: ({}: UserObject) => void
    logout: () => void
}

interface UserObject {
    email: string
    password: string
}

interface UserAuthContextProps {
    children: JSX.Element
}

export const AuthContext = createContext<UserAuthContextObject | undefined>(undefined);

export const AuthProvider = (props: UserAuthContextProps) => {
    const [user, setUser] = useState({});
    const [isAuth, setIsAuth] = useState(false);

    //Fetch user
    onAuthStateChanged(auth, (user) => {
        if (user) {
            setUser(user);
            setIsAuth(true);
        } else {
            setIsAuth(false);
        }
    })

    //Sign in user
    const signInUser = async ({ email, password }: UserObject) => {
            await signInWithEmailAndPassword(auth, email, password);
    }

    //Create account
    const createAccount = async ({ email, password }: UserObject) => {
        await createUserWithEmailAndPassword(auth, email, password);
    }

    //Logout user
    const logout = async () => {
        try {
          await signOut(auth);
        } catch (err) {
          console.error(err);
        }
    };
    
    return(
        <AuthContext.Provider value={{ isAuth, signInUser, createAccount, logout }}>
            {props.children }
        </AuthContext.Provider>
    );
}