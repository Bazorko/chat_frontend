import { useState } from "react";
import ModalContainer from "../../utils/ui-containers/ModalContainer";
import MenuIcon from "../../utils/assets/MenuIcon";
import AccountImagePlaceholderIcon from "../../utils/assets/AccountIcon";

const Nav = () => {
    const [ isModalContainerOpen, setIsModalContainerOpen ] = useState(false);
    const [ menuOrAccount, setMenuOrAccount ] = useState("");
    const modalContainer = (bool: boolean) => setIsModalContainerOpen(bool);

    if(isModalContainerOpen) return <ModalContainer modalContainer={modalContainer} menuOrAccount={menuOrAccount}/>

    return (
        <nav className="flex justify-between lg:place-content-end w-full py-3">
            <span className="lg:hidden" onClick={() => {
                modalContainer(true);
                setMenuOrAccount("menu");
            }}>
                <MenuIcon height={"h-20"}/>
            </span>
            <span className="" onClick={() => {
                modalContainer(true);
                setMenuOrAccount("account");
            }}>
                <AccountImagePlaceholderIcon height={"h-20 lg:h-12"}/>
            </span>
        </nav>
    )
}

export default Nav;
