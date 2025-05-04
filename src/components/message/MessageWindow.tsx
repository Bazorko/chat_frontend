import { useData } from "../../hooks/useData";
import LoadingComponent from "../../utils/assets/LoadingComponent";
import SubmitMessage from "./components/SubmitMessage";
import { socket } from "../../socketstuff/socket";
import { useEffect } from "react";

const MessageWindow = () => {

    const { user, loading, contact, messages, setMessages } = useData();

    useEffect(() => {
        socket.on("returnMessage", (msg) => {
            console.log([...messages, msg]);
            setMessages([...messages, msg]);
        });
        return () => {
            socket.off("returnMessage", () => {});
        }
    }, []);

    return(
        <>
            { loading ? 
                <div className="w-full h-full flex justify-center items-center">
                    <LoadingComponent />
                </div>
                 : 
                <section className="p-8 pt-0 grow overflow-auto flex flex-col">
                    <h2 className="text-white text-center text-lg p-5">{ contact?.username }</h2>
                    { messages.map(message => {
                        return(
                            <section key={ message._id } className={ `text-white mb-5 w-fit max-w-3/4 rounded-lg p-2 ${ user._id == message.from ? " bg-primary_blue self-end" : "bg-neutral-600" }` }><p className="w-full">{ message.content }</p></section>
                        );
                    }) }
                </section>
            }
            {/*Chat Box*/}
            <section className="p-8">
                <SubmitMessage />
            </section>
        </>
    );
}

export default MessageWindow;