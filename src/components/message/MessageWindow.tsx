import { useState, FormEvent } from "react";
import { useData } from "../../hooks/useData";
import LoadingComponent from "../../utils/assets/LoadingComponent";

const MessageWindow = () => {

    const [ input, setInput ] = useState("");

    const { user, loading, contactUsername, messages } = useData();

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        //Validation
        //API Call
    }

    return(
        <>
            { loading ? 
                <div className="w-full h-full flex justify-center items-center">
                    <LoadingComponent />
                </div>
                 : 
                <section className="p-8 pt-0 grow overflow-auto flex flex-col">
                    <h2 className="text-white text-center text-lg p-5">{ contactUsername }</h2>
                    { messages.map(message => {
                        return(
                            <section key={ message._id } className={ `text-white mb-5 w-fit max-w-3/4 rounded-lg p-2 ${ user._id == message.from ? " bg-primary_blue self-end" : "bg-neutral-600" }` }><p className="w-full">{ message.content }</p></section>
                        );
                    }) }
                </section>
            }
            {/*Chat Box*/}
            <section className="p-8">
                <form className="flex gap-2" onSubmit={ handleSubmit } autoComplete="off">
                    <input type="text" value={ input } onChange={ (event) => setInput(event.target.value) } className="border-white grow p-2 rounded-lg" placeholder="Enter your message"/>
                    <button className="text-white w-1/4 p-2 bg-primary_blue border-primary_blue hover:bg-primary_blue_darker hover:border-primary_blue_darker rounded-lg">Send</button>
                </form>
            </section>
        </>
    );
}

export default MessageWindow;