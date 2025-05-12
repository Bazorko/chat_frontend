import { useData } from "../../../hooks/useData"

interface RemoveUserProps{
    userToRemove: string,
    userToRemoveId: string,
    closePortal: () => void,
    deleteContact: (userId: string, contactId: string) => void,
    setUserToRemove: (string: string) => void,
    setUserToRemoveId: (string: string) => void
}

const RemoveUser = ({ userToRemove, userToRemoveId, closePortal, deleteContact, setUserToRemove, setUserToRemoveId }: RemoveUserProps) => {
    const { user } = useData();
    return(
        <section className="flex flex-col max-h-min items-center w-full">
            <p onClick={ () => closePortal() } className="text-xl place-self-start cursor-pointer text-white">&times;</p>
            <section className="w-10/12 max-h-min flex flex-col p-5 overflow-auto text-center">
                <p className="text-white text-lg py-2.5">Remove {userToRemove} from your contacts?</p>
                <div className="flex justify-center w-full gap-2.5 py-2.5">
                    <button onClick={ () => { 
                        deleteContact(user._id!, userToRemoveId);
                        setUserToRemove("");
                        setUserToRemoveId("");
                        closePortal();
                    } } className="bg-red-500 border-red-500 border-2 px-5 py-2 rounded-lg text-white">Yes</button>
                    <button onClick={ () => closePortal() } className="text-neutral-900 bg-neutral-300 border-2 px-5 py-2 border-neutral-300 rounded-lg">No</button>
                </div>
            </section>
        </section>
    );
}
export default RemoveUser;