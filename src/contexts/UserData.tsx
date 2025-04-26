import { createContext, useEffect, useState } from "react";

interface UserData{
    _id?: string,
    username?: string,
    email?: string,
    inbox?: {_id: string, username: string}[],
    createdAt?: string
}

interface MessagesObject{
    _id?: string,
    to?: string,
    from?: string,
    content?: string,
    sentAt?: string
    __v?: number
}


interface UserDataContextObject{
    user: UserData,
    messages: MessagesObject[],
    setMessages: (messages: MessagesObject[]) => any
    updateUserDataInLocalStorage: (json: UserData) => void,
    setUser: (user: UserData) => any,
    sendUserDataToDb: (userData: UserData) => void,
    retrieveUserDataFromDb: (userData: UserData) => void,
    addNewContact: (newContact: string) => void
}

interface UserDataContextProps{
    children: JSX.Element
}

export const DataContext = createContext<UserDataContextObject | null>(null);

export const DataProvider = (props: UserDataContextProps) => {

    const [ user, setUser ] = useState<UserData>({ inbox: [] });
    const [ messages,  setMessages ] = useState<MessagesObject[]>([]);

    useEffect(() => {
        const userDataStringified = localStorage.getItem("user");
        if(userDataStringified){
            const userDataParsed = JSON.parse(userDataStringified);
            updateUserDataInLocalStorage(userDataParsed);
        }
    },[]);

    //Updates user data in local storage, and in context.
    const updateUserDataInLocalStorage = (json: any) => {
        localStorage.setItem("user", JSON.stringify(json));
        setUser({ ...json });
    }

    //On account creation, send user data to db.
    const sendUserDataToDb = async (userData: UserData) => {
        const url = "http://localhost:3000/user/signup";
        const options: RequestInit = {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userData)
        };
       const response = await fetch(url, options);
       if(response.ok) console.log("Account created successfully.");
       const json = await response.json();
       updateUserDataInLocalStorage(json.data);
    }

    //On sign in
    const retrieveUserDataFromDb = async (userData: UserData) => {
        const url = "http://localhost:3000/user/signin";
        const options: RequestInit = {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userData)
        };
        const response = await fetch(url, options);
        if(response.ok) console.log("Successfully signed in.");
        const json = await response.json();
        updateUserDataInLocalStorage(json.data);
    }

    //Add contact
    const addNewContact = async (newContact: string) => {
        const url = "http://localhost:3000/user/contacts";
        const options: RequestInit = {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username: user.username, contact: newContact })
        };
        const response = await fetch(url, options);
        return response;
    }

    return(
        <DataContext.Provider value={{ user, messages, setMessages, updateUserDataInLocalStorage, setUser, sendUserDataToDb, retrieveUserDataFromDb, addNewContact }}>
            {props.children }
        </DataContext.Provider>
    );
}