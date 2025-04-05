import { FormEvent, useState } from "react";
import { useData } from "../../../hooks/useData";
import AccountError from "../utils/AccountError";

const MessageList = () => {
    const { user, addNewContact } = useData();
    const [ errorMessage, setErrorMessage ] = useState("");
    const [ contact, setContact ] = useState("");
    const inbox = user.inbox;
    //Search for contact
    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        const response: any = await addNewContact(contact);
        const json = await response.json();
        console.log(response);
        if(!response.ok) setErrorMessage(json.message);
        setContact("");
    }
    return (
        <section className="self-center">
            <p className="text-white text-center text-2xl p-10 lg:p-5">Inbox</p>
            {errorMessage && <AccountError message={errorMessage}/>}
            <form onSubmit={handleSubmit} className="grid gap-2">
                <input type="text" className="rounded-lg pl-2 py-1" value={contact} onChange={ (event) => {
                    setContact(event.target.value);
                    setErrorMessage("");
                } } placeholder="Enter a username"/>
                <button className="text-neutral-900 bg-neutral-300 border-neutral-300 border-2 rounded-lg py-1">Search</button>
            </form>
            <ul className="text-center mt-8">
                { inbox?.map(contact => {
                    return(<li className="text-white text-center text-lg p-3">{contact.username}</li>);
                }) }
            </ul>
        </section>
    )
}

export default MessageList;
