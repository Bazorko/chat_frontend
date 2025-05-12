import AccountList from "../../components/account/components/AccountList";
import ContactList from "../../components/account/ContactList";

interface ModalContainerProps{
    modalContainer: (bool: boolean) => void
    menuOrAccount: string
}

const ModalContainer = ({ modalContainer, menuOrAccount }: ModalContainerProps) => {
    const closeModalContainer = () => {
        modalContainer(false)
    }
    return (
        <aside className={`${menuOrAccount === "menu" && "animate-fadeInLeftToRight"} ${menuOrAccount === "account" && "animate-fadeInRightToLeft"} absolute h-screen w-screen bg-dark_theme flex flex-col p-5`}>
            <section>
                <button className="text-white text-4xl" onClick={closeModalContainer}>&times;</button>
            </section>
            {menuOrAccount === "menu" && <ContactList closeModalContainer={closeModalContainer}/>}
            {menuOrAccount === "account" && <AccountList />}
        </aside>
    )
}

export default ModalContainer
