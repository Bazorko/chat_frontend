import { useState, useEffect, FormEvent } from "react";
import LoadingComponent from "../../../utils/assets/LoadingComponent";
import { useData } from "../../../hooks/useData";
import { socket } from "../../../socketstuff/socket";

interface MessagesObject{
    _id?: string,
    to?: string,
    from?: string,
    content?: string,
    sentAt?: string
    __v?: number
}

const SubmitMessage = () => {
    const [ input, setInput ] = useState("");
    const [ isLoading, setIsLoading ] = useState(false);

    const { user, contact, messages, setMessages } = useData();

    useEffect(() => {
        const handleReturnMesage = (msg: any) => {
            //setMessages([...messages, msg]);
            setMessages((prevMessages: any) => [...prevMessages, msg]);
        }
        socket.on("returnMessage", handleReturnMesage);
        return() => {
            socket.off("returnMessage", handleReturnMesage);
        };
    }, []);

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        setIsLoading(true);
        //Validation
        //API Call
        socket.emit("sendMessage", ({ to: contact?.contactId, from: user._id, content: input }), () => { 
            setInput("");
            setIsLoading(false);
        });
    }

    return(
        <form className="flex gap-2" onSubmit={ handleSubmit } autoComplete="off">
            <input type="text" value={ input } onChange={ (event) => setInput(event.target.value) } className="border-white grow p-2 rounded-lg" placeholder="Enter your message"/>
            <button className="text-white w-1/4 p-2 bg-primary_blue border-primary_blue hover:bg-primary_blue_darker hover:border-primary_blue_darker rounded-lg" disabled={ isLoading }>{ isLoading ? <div className="w-full h-full flex justify-center items-center"><LoadingComponent/></div> : <span>Send</span> }</button>
        </form>
    );
}

export default SubmitMessage;