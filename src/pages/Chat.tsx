import { useState, FormEvent } from "react";
import Nav from  "../components/Nav.tsx";
import MessageList from "../components/account/chat/MessageList.tsx";
import Modal from "../components/utils/Modal.tsx";

const Chat = () => {

    const [ message, setMessage ] = useState("");

    const [ isPortalOpen, setIsPortalOpen ] = useState(false);

    const openPortal = () => {
        setIsPortalOpen(true);
    };
    const closePortal = () => {
        setIsPortalOpen(false);
    };

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        //Validation
        //API Call
    }

    const messages = [
        {
            self: true,
            message: "lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum"
        },
        {
            self: false,
            message: "lorem ipsum to you to. lorem ipsum to you to. lorem ipsum to you to."
        },
    ];
    return (
        <section className="flex flex-col h-screen">
            <Nav />
            {/*Message List - render when on larger viewports*/}
            <section className="flex flex-row w-full grow">
                <section className="hidden lg:block px-10 w-3/12">
                    <MessageList/>
                </section>
                <section className="flex flex-col grow lg:px-10">
                    {/*Chat Window*/}
                    <section className="p-8 pt-0 grow overflow-auto flex flex-col">
                        <h2 className="text-white text-center text-lg p-5">Uco</h2>
                        {messages.map((message) => {
                            return(
                                <section className={`text-white mb-5 w-fit max-w-3/4 rounded-lg p-2 ${message.self ? " bg-primary_blue self-end" : "bg-neutral-600"}`}><p className="w-full">{message.message}</p></section>
                            );
                        })}
                    </section>
                    {/*Chat Box*/}
                    <section className="p-8">
                        <form className="flex gap-2" onSubmit={handleSubmit} autoComplete="off">
                            <input type="text" value={message} onChange={(event) => setMessage(event.target.value)} className="border-white grow p-2 rounded-lg" placeholder="Enter your message"/>
                            <button className="text-white w-1/4 p-2 bg-primary_blue border-primary_blue hover:bg-primary_blue_darker hover:border-primary_blue_darker rounded-lg">Send</button>
                        </form>
                    </section>
                </section>
            </section>
        </section>
    )
}

export default Chat;
