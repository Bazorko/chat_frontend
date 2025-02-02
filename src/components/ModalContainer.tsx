import AccountList from "./AccountList";
import MessageList from "./MessageList";

interface ModalContainerProps{
    modalContainer: (bool: boolean) => void
    menuOrAccount: string
}

const ModalContainer = ({ modalContainer, menuOrAccount }: ModalContainerProps) => {
    return (
        <aside className="absolute h-screen w-screen bg-black flex flex-col p-5">
            <section>
                <button className="text-white text-4xl" onClick={() => modalContainer(false)}>&times;</button>
            </section>
            {menuOrAccount === "menu" && <MessageList />}
            {menuOrAccount === "account" && <AccountList />}
        </aside>
    )
}

export default ModalContainer
