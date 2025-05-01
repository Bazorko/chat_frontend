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
    contactUsername: string,
    messages: MessagesObject[],
    loading: boolean,
    downloadMessages: (userId: string | undefined, contactId: string | undefined, contactUsername: string) => void,
    addContact: (newContact: string) => void,
    deleteContact: (userId: string | undefined, contactId: string) => void,
    updateUserDataInLocalStorage: (json: UserData) => void,
    setUser: (user: UserData) => any,
    sendUserDataToDb: (userData: UserData) => void,
    retrieveUserDataFromDb: (identifier: string) => void,
}

interface UserDataContextProps{
    children: JSX.Element
}

export const DataContext = createContext<UserDataContextObject | null>(null);

export const DataProvider = (props: UserDataContextProps) => {

    const [ user, setUser ] = useState<UserData>({ inbox: [] });
    const [ loading, setLoading ] = useState(false);
    const [ contactUsername, setContactUsername ] = useState("");
    const [ messages,  setMessages ] = useState<MessagesObject[]>([]);

    useEffect(() => {
        const userDataStringified = localStorage.getItem("user");
        if(userDataStringified){
            const userDataParsed = JSON.parse(userDataStringified);
            updateUserDataInLocalStorage(userDataParsed);
        }
    },[]);

    //Updates user data in local storage, and in context.
    const updateUserDataInLocalStorage = async (json: any) => {
        await localStorage.setItem("user", JSON.stringify(json));
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
    const retrieveUserDataFromDb = async (identifier: string) => {
        const url = "http://localhost:3000/user/signin";
        const options: RequestInit = {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ identifier })
        };
        const response = await fetch(url, options);
        if(response.ok) console.log("Successfully signed in.");
        const json = await response.json();
        updateUserDataInLocalStorage(json.data);
    }

    //API

    //Add contact
    const addContact = async (newContact: string) => {
        const url = "http://localhost:3000/api/contacts";
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

    //Delete Contact
    const deleteContact = async (userId: string | undefined, contactId: string) => {
        const url = `http://localhost:3000/api/${ userId }/contacts/${ contactId }`;
        const options: RequestInit = {
            method: "DELETE",
            credentials: "include",
        }
        const response = await fetch(url, options);
        const json = await response.json();
        if(response.ok) updateUserDataInLocalStorage(json.data);
    }

    //Download messages.
    const downloadMessages = async (userId: string | undefined, contactId: string | undefined, contactUsername: string) => {
        setLoading(true);
        const url = `http://localhost:3000/api/${ userId }/messages?contact=${ contactId }`;
        const options: RequestInit = {
            method: "GET",
            credentials: "include",
        }
        const response = await fetch(url, options);
        const json = await response.json();
        setMessages(json.data.messages);
        setContactUsername(contactUsername);
        setLoading(false);
    }

    return(
        <DataContext.Provider value={{ user, loading, contactUsername, messages, downloadMessages, updateUserDataInLocalStorage, setUser, sendUserDataToDb, retrieveUserDataFromDb, addContact, deleteContact }}>
            {props.children }
        </DataContext.Provider>
    );
}