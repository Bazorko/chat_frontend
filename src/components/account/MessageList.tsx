import { FormEvent, useState } from "react";
import { useData } from "../../hooks/useData";
import Portal from "../../utils/ui-containers/Portal";
import Modal from "../../utils/ui-containers/Modal";
import AccountError from "./components/AccountError";

const MessageList = () => {
    const { user, downloadMessages, addContact, deleteContact, updateUserDataInLocalStorage } = useData();

    const [ errorMessage, setErrorMessage ] = useState("");
    const [ isPortalOpen, setIsPortalOpen ] = useState(false);
    const [ contact, setContact ] = useState("");
    const [ userToRemove, setUserToRemove ] = useState("");
    const [ userToRemoveId, setUserToRemoveId ] = useState("");

    const inbox = user.inbox;

    const openPortal = (contactId: string, contactUsername: string) => {
        setIsPortalOpen(true);
        setUserToRemove(contactUsername);
        setUserToRemoveId(contactId);
    };
    const closePortal = () => {
        setIsPortalOpen(false);
    };

    //Search for contact
    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        const response: any = await addContact(contact);
        const json = await response.json();
        if(!response.ok) setErrorMessage(json.message);
        updateUserDataInLocalStorage(json.data);
        setContact("");
    }
    return (
        <>
            <section className="self-center">
                <p className="text-white text-center text-2xl p-10 lg:p-5">Inbox</p>
                { errorMessage && <AccountError message={ errorMessage }/> }
                <form onSubmit={ handleSubmit } className="grid gap-2">
                    <input type="text" className="rounded-lg pl-2 py-1" value={ contact } onChange={ (event) => {
                        setContact(event.target.value);
                        setErrorMessage("");
                    } } placeholder="Enter a username"/>
                    <button className="text-neutral-900 bg-neutral-300 border-neutral-300 border-2 rounded-lg py-1">Search</button>
                </form>
                <ul className="text-center mt-8">
                    { inbox?.length ? inbox?.map(contact => {
                        return(
                            <li key={ contact._id } className="flex text-white text-center text-lg p-3 cursor-pointer">
                                <p className="w-full" onClick={ () => downloadMessages(user._id, contact._id, contact.username) } >{ contact.username }</p>
                                <p onClick={ () => openPortal(contact._id, contact.username) } className="text-white text-xl cursor-pointer">&times;</p>
                            </li>);
                        }) : <p className="text-white">Add someone to get started.</p>
                    }
                </ul>
            </section>
            { isPortalOpen && 
                <Portal closePortal={ closePortal }>
                    <Modal>
                        <>
                            <section className="flex flex-col max-h-min items-center w-full">
                                <p onClick={ () => closePortal() } className="text-xl place-self-start cursor-pointer text-white">&times;</p>
                                <section className="w-10/12 max-h-min flex flex-col p-5 overflow-auto text-center">
                                    <p className="text-white text-lg py-2.5">Remove {userToRemove} from your contacts?</p>
                                    { errorMessage && <AccountError message={errorMessage}/> }
                                    <div className="flex justify-center w-full gap-2.5 py-2.5">
                                        <button onClick={ () => { 
                                            deleteContact(user._id, userToRemoveId);
                                            setUserToRemove("");
                                            setUserToRemoveId("");
                                            closePortal();
                                        } } className="bg-red-500 border-red-500 border-2 px-5 py-2 rounded-lg text-white">Yes</button>
                                        <button onClick={ () => closePortal() } className="text-neutral-900 bg-neutral-300 border-2 px-5 py-2 border-neutral-300 rounded-lg">No</button>
                                    </div>
                                </section>
                            </section>
                        </>
                    </Modal>
                </Portal> 
            }
        </>
    )
}

export default MessageList;
