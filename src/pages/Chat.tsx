import Nav from  "../components/Nav.tsx";

const Chat = () => {
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
            {/*Chat Window*/}
            <section className="p-8 grow overflow-auto flex flex-col">
                {messages.map((message) => {
                    return(
                        <section className={`text-white mb-5 w-fit max-w-3/4 rounded-lg p-2 ${message.self ? " bg-primary_blue self-end" : "bg-neutral-600"}`}><p className="w-full">{message.message}</p></section>
                    );
                })}
            </section>
            {/*Chat Box*/}
            <section className="p-8">
                <form className="flex gap-2">
                    <input type="text" className="border-white grow p-2 rounded-lg" placeholder="Enter your message"/>
                    <button className="text-white w-1/4 p-2 bg-primary_blue border-primary_blue hover:bg-primary_blue_darker hover:border-primary_blue_darker rounded-lg">Send</button>
                </form>
            </section>
        </section>
    )
}

export default Chat;
