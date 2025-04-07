import { useState, FormEvent } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useData } from "../../hooks/useData";
import { Navigate } from "react-router-dom";
import AccountError from "./utils/AccountError";
import Modal from "../utils/Modal";
import { FirebaseError } from "firebase/app";

interface LoginComponentInterface{
    closePortal: () => void;
}

const SignIn = ({ closePortal }: LoginComponentInterface) => {

    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ errorCode, setErrorCode ] = useState("");

    const { signInUser } = useAuth();
    const { retrieveUserDataFromDb } = useData();

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        //Validation
        //API Call
        try {
            await signInUser({ email, password });
        } catch(error) {
            if(error instanceof FirebaseError) setErrorCode(error.code);
        }
        try {
            await retrieveUserDataFromDb({ email });
        } catch(error) {
            if(error instanceof FirebaseError) setErrorCode(error.code);
        }
        return <Navigate to="/chat"/>
    }

    return(
        <Modal>
            <section className="w-full max-h-min flex flex-col overflow-auto">
                <button onClick={closePortal} className="text-white text-2xl self-start hover:text-gray-400">&times;</button>
                <h3 className="text-white place-self-center text-3xl pt-8">Sign In</h3>
                <form className="self-center w-full lg:w-7/12" onSubmit={handleSubmit} autoComplete="off">
                    <fieldset className="flex flex-col">
                        <fieldset>Personal Information</fieldset>
                        { errorCode && <AccountError message={errorCode}/> }
                        <label htmlFor="username" className="text-white text-lg p-2">Email</label>
                        <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} id="username" className="p-3 rounded-lg" placeholder="Enter your email." required/>

                        <label htmlFor="password" className="text-white text-lg p-2 ">Password</label>
                        <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} id="password" className="p-3 rounded-lg" placeholder="Enter your password." required/>
                    </fieldset>
                    <section>
                        <p className="text-white text-center py-3"><span className="cursor-pointer hover:underline">Forgot Password?</span></p>
                        <button className="text-neutral-900 text-lg bg-neutral-300 border-2 border-neutral-300 rounded-lg w-full py-2 hover:bg-neutral-600 hover:border-neutral-600 hover:scale-95">Sign In</button>
                    </section>
                </form>
            </section>
        </Modal>
    );
}
export default SignIn;