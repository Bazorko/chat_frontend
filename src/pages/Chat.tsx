import { useState, useEffect } from "react";
import Nav from  "../components/nav/Nav.tsx";
import ContactList from "../components/account/components/ContactList.tsx";
import MessageWindow from "../components/message/MessageWindow.tsx";
import { socket } from "../socketstuff/socket.ts";
import ConnectionState from "../socketstuff/ConnectState.tsx";


const Chat = () => {
    const [ isConnected, setIsConnected ] = useState(socket.connected);

    useEffect(() => {

        const onConnect = () => {
            setIsConnected(true);
        }

        const onDisconnect = () => {
            setIsConnected(false);
        }

        socket.on('connect', onConnect);
        socket.on('disconnect', onDisconnect);

        return () => {
            socket.off('connect', onConnect);
            socket.off('disconnect', onDisconnect);
        };

    }, []);

    return (
        <>
            <section className="flex flex-col h-screen">
                <Nav />
                {/*Message List - render when on larger viewports*/}
                <section className="flex flex-row w-full grow gap-10">
                    <section className="hidden lg:block w-3/12">
                        <ContactList />
                    </section>
                    <section className="flex flex-col grow px-5 pb-5">
                        {/*Chat Window*/}
                        <MessageWindow />
                    </section>
                </section>
            </section>
        </>
    )
}

export default Chat;
