import { useState } from "react";
import { useData } from "../../hooks/useData";
import LoadingComponent from "../../utils/assets/LoadingComponent";
import SubmitMessage from "./components/SubmitMessage";

const MessageWindow = () => {

    const { user, loading, contact, messages } = useData();

    return(
        <>
            { loading ? 
                <div className="w-full h-full flex justify-center items-center">
                    <LoadingComponent />
                </div>
                : 
                <>
                    { contact ? 
                    <>
                        <section className="pt-0 grow overflow-auto flex flex-col gap-3">
                            <h2 className="text-white text-center text-lg p-2">{ contact?.username }</h2>
                            { messages.map(message => {
                                return(
                                    <div key={ message._id } className={ `text-white w-fit max-w-3/4 rounded-lg p-2 ${ user._id == message.from ? " bg-primary_blue self-end" : "bg-neutral-600" }` }><p className="w-full">{ message.content }</p></div>
                                );
                            }) }
                        </section>
                        {/*Chat Box*/}
                        <section className="">
                            <SubmitMessage/>
                        </section>
                    </> : <p className="text-white w-full h-full flex justify-center items-center">Get chatting.</p> }
                </>
            }
        </>
    );
}

export default MessageWindow;