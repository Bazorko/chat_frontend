import { createContext, useState } from "react";

interface UserData{
    username: string,
    email: string,
}

interface UserDataContextObject{
    sendUserDataToDb: (userData: UserData) => void;
}

interface UserDataContextProps{
    children: JSX.Element
}

export const DataContext = createContext<UserDataContextObject | undefined>(undefined);

export const DataProvider = (props: UserDataContextProps) => {

    const [ user, setUser ] = useState<UserData | {}>({});

    //On account creation, send user data to db.
    const sendUserDataToDb = async (userData: UserData) => {
        setUser({ ...userData });
        const url = "http://localhost:3000/user/signup";
        const options: RequestInit = {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user)
        };
       const response = await fetch(url, options);
       if(response.ok) console.log("Account created successfully.");
    }

    return(
        <DataContext.Provider value={{ sendUserDataToDb }}>
            {props.children }
        </DataContext.Provider>
    );
}