import Logo from "../components/Logo";

const Chat = () => {
    const messages = [
        {
            self: true,
            message: "lorem ipsum"
        },
        {
            self: false,
            message: "lorem ipsum to you to."
        },
    ];
    return (
        <section className="flex flex-col h-screen">
            <section className="">
                <Logo />
            </section>
            {/*Chat Window*/}
            <section className="p-8 grow overflow-auto">
                {messages.map((message) => {
                    return(
                        <p className={`text-white ${message.self ? "text-right" : "text-left"}`}><span className={`${message.self ? "bg-primary_blue" : "bg-neutral-600"}`}>{message.message}</span></p>
                    );
                })}
            </section>
            {/*Chat Box*/}
            <section className="p-8">
                <form>
                    <input type="text" className="border-white" placeholder="Enter your message"/>
                    <button className="text-white">Send</button>
                </form>
            </section>
        </section>
    )
}

export default Chat;
