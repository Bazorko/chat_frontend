import { useState, useEffect } from "react";
import Nav from  "../components/nav/Nav.tsx";
import MessageList from "../components/account/MessageList.tsx";
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
            <section className="flex flex-col h-screen">
                <Nav />
                {/*Message List - render when on larger viewports*/}
                <section className="flex flex-row w-full grow">
                    <section className="hidden lg:block px-10 w-3/12">
                        <MessageList />
                    </section>
                    <section className="flex flex-col grow lg:px-10">
                        {/*Chat Window*/}
                        <MessageWindow />
                    </section>
                </section>
            </section>
        </>
    )
}

export default Chat;
