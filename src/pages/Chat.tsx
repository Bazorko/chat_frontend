import { useState, useEffect } from "react";
import Nav from  "../components/nav/Nav.tsx";
import ContactList from "../components/account/ContactList.tsx";
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
            <ConnectionState isConnected={ isConnected } />
            <section className="flex flex-col h-screen pb-5">
                <Nav />
                {/*Message List - render when on larger viewports*/}
                <section className="flex flex-row w-full grow gap-10">
                    <section className="hidden lg:block w-3/12">
                        <ContactList />
                    </section>
                    <section className="flex flex-col grow">
                        {/*Chat Window*/}
                        <MessageWindow />
                    </section>
                </section>
            </section>
        </>
    )
}

export default Chat;
