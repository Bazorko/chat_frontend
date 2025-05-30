import { FormEvent, useState } from "react";
import { useData } from "../../../hooks/useData";
import Portal from "../../../utils/ui-containers/Portal";
import Modal from "../../../utils/ui-containers/Modal";
import { socket } from "../../../socketstuff/socket";
import { connect, disconnect } from "../../../socketstuff/ConnectionManager";
import RemoveUser from "./RemoveUser";
import ErrorMessage from "./ErrorMessage";

interface ErrorData{
    ok: boolean | undefined,
    message: string
}

interface ContainerListProps{
    closeModalContainer?: () => void
}

const ContactList = ({ closeModalContainer }: ContainerListProps) => {
    const { user, downloadMessages, addContact, deleteContact } = useData();

    const [ errorData, setErrorData ] = useState<ErrorData | undefined>(undefined);
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
        const response = await addContact(contact);
        setErrorData({ ...response });
        setContact("");
        if(response.ok){
            setTimeout(() => {
                setErrorData(undefined);
            }, 5000);
        }
    }

    const handleClick = (contactId: string, contactUsername: string) => {
        downloadMessages(user._id, contactId, contactUsername);
        if(socket.connected) {
            disconnect();
        }
        connect(); 
        const arrayOfIds = [user._id, contactId].sort();
        const roomName = arrayOfIds[0]! + arrayOfIds[1]!;
        socket.emit("join room", roomName);
        if(window.innerWidth <= 1023){
            if(closeModalContainer){
                closeModalContainer();
            }
        }
    }
    return (
        <>
            <section className=" flex flex-col gap-3 self-center">
                <p className="text-white text-center text-2xl">Inbox</p>
                { errorData && <ErrorMessage data={ errorData }/> }
                <form onSubmit={ handleSubmit } className="grid gap-2">
                    <input type="text" className="rounded-lg pl-2 py-1" value={ contact } onChange={ (event) => {
                        setContact(event.target.value);
                        setErrorData(undefined);
                    } } placeholder="Enter a username"/>
                    <button className="text-neutral-900 bg-neutral-300 border-neutral-300 border-2 rounded-lg py-1">Search</button>
                </form>
                <ul className="flex flex-col gap-2 text-center mt-8">
                    { inbox?.length ? inbox?.map(contact => {
                        return(
                            <li key={ contact._id } className="flex text-white text-center text-lg px-3 cursor-pointer">
                                <p className="w-full" onClick={ () => handleClick(contact._id, contact.username) } >{ contact.username }</p>
                                <p onClick={ () => openPortal(contact._id, contact.username) } className="text-white text-xl cursor-pointer">&times;</p>
                            </li>);
                        }) : <p className="text-white">Add someone to get started.</p>
                    }
                </ul>
            </section>
            { isPortalOpen && 
                <Portal closePortal={ closePortal }>
                    <Modal>
                        <RemoveUser userToRemove={userToRemove} userToRemoveId={userToRemoveId} closePortal={closePortal} deleteContact={deleteContact} setUserToRemove={setUserToRemove} setUserToRemoveId={setUserToRemoveId}/>
                    </Modal>
                </Portal> 
            }
        </>
    )
}

export default ContactList;
