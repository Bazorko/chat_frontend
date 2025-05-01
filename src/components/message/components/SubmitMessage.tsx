import { useState, FormEvent } from "react";

const SubmitMessage = () => {
    const [ input, setInput ] = useState("");

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        //Validation
        //API Call
    }

    return(
        <form className="flex gap-2" onSubmit={ handleSubmit } autoComplete="off">
            <input type="text" value={ input } onChange={ (event) => setInput(event.target.value) } className="border-white grow p-2 rounded-lg" placeholder="Enter your message"/>
            <button className="text-white w-1/4 p-2 bg-primary_blue border-primary_blue hover:bg-primary_blue_darker hover:border-primary_blue_darker rounded-lg">Send</button>
        </form>
    );
}

export default SubmitMessage;