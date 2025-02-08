import AccountList from "../account/chat/AccountList";
import MessageList from "../account/chat/MessageList";

interface ModalContainerProps{
    modalContainer: (bool: boolean) => void
    menuOrAccount: string
}

const ModalContainer = ({ modalContainer, menuOrAccount }: ModalContainerProps) => {
    return (
        <aside className={`${menuOrAccount === "menu" && "animate-fadeInLeftToRight"} ${menuOrAccount === "account" && "animate-fadeInRightToLeft"} absolute h-screen w-screen bg-dark_theme flex flex-col p-5`}>
            <section>
                <button className="text-white text-4xl" onClick={() => modalContainer(false)}>&times;</button>
            </section>
            {menuOrAccount === "menu" && <MessageList />}
            {menuOrAccount === "account" && <AccountList />}
        </aside>
    )
}

export default ModalContainer
