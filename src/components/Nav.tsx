import { useState } from "react";
import MessageList from "./MessageList";
import MenuIcon from "./MenuIcon";
import AccountImagePlaceholderIcon from "./AccountIcon";

const Nav = () => {
    const [ isMessageListOpen, setIsMessageListOpen ] = useState(false);
    const messageListMenu = (bool: boolean) => {
        setIsMessageListOpen(bool)
    }

    if(isMessageListOpen){
        return(
            <MessageList messageListMenu={messageListMenu}/>
        );
    }

    return (
        <section className="flex justify-between w-full">
                <span onClick={() => messageListMenu(true)}>
                    <MenuIcon height={"h-20"}/>
                </span>
                <AccountImagePlaceholderIcon height={"h-20"}/>
        </section>
    )
}

export default Nav;
