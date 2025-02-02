import { useState } from "react";
import ModalContainer from "./ModalContainer";
import MenuIcon from "./MenuIcon";
import AccountImagePlaceholderIcon from "./AccountIcon";

const Nav = () => {
    const [ isModalContainerOpen, setIsModalContainerOpen ] = useState(false);
    const [ menuOrAccount, setMenuOrAccount ] = useState("");
    const modalContainer = (bool: boolean) => setIsModalContainerOpen(bool)

    if(isModalContainerOpen) return <ModalContainer modalContainer={modalContainer} menuOrAccount={menuOrAccount}/>

    return (
        <section className="flex justify-between w-full">
            <span onClick={() => {
                modalContainer(true);
                setMenuOrAccount("menu");
            }}>
                <MenuIcon height={"h-20"}/>
            </span>
            <span onClick={() => {
                modalContainer(true);
                setMenuOrAccount("account");
            }}>
                <AccountImagePlaceholderIcon height={"h-20"}/>
            </span>
        </section>
    )
}

export default Nav;
