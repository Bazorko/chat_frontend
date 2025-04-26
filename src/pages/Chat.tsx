import Nav from  "../components/Nav.tsx";
import MessageList from "../components/account/chat/MessageList.tsx";
import MessageWindow from "../components/MessageWindow.tsx";

const Chat = () => {
    return (
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
    )
}

export default Chat;
