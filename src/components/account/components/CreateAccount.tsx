import { useState, useEffect, FormEvent } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";
import { useData } from "../../../hooks/useData";
import Modal from "../../../utils/ui-containers/Modal";
import ErrorMessage from "./ErrorMessage";
import { FirebaseError } from "firebase/app";
import { getAuth } from "firebase/auth";
import { sendEmailVerification } from "firebase/auth";

interface ErrorData{
    ok: boolean | undefined,
    message: string
}

interface CreateAccountComponentInterface{
    closePortal: () => void;
}

const CreateAccount = ({ closePortal }: CreateAccountComponentInterface) => {

    const [ isMouseDown, setIsMouseDown ] = useState(false);

    const [ username, setUsername ] = useState("");
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ verifyPassword, setVerifyPassword ] = useState("");
    const [ errorData, setErrorData ] = useState<ErrorData | undefined>(undefined);

    const auth = getAuth();
    const user = auth.currentUser;

    const { createAccount } = useAuth();
    const { sendUserDataToDb } = useData();

    useEffect(() => {
        setErrorData(undefined);
    }, [username, email, password, verifyPassword]);

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        //Validation
        if(!username.match(/^[a-zA-Z0-9]+$/)){
            if(username.length <= 2){
                setErrorData({ ok: false, message: "Username must be longer than 2 characters." });
                return;
            }
            setErrorData({ ok: false, message: "Your username may not have special characters." });
            return;
        } else if(password !== verifyPassword){
            setErrorData({ ok: false, message: "Your passwords do not match." });
            return;
        }
        try {
            await createAccount({ email, password });
            await sendUserDataToDb({ username, email });
            if(auth.currentUser){
                sendEmailVerification(auth.currentUser);
            }
        } catch(error: any){
            console.error(error);
            if(error instanceof FirebaseError){ 
                setErrorData({ ok: false, message: error.code });
            } else {
                setErrorData({ ok: false, message: error.code });
            }
            return;
        }
        return <Navigate to="/chat"/>
    }

    const handleInputChange = (input: string, updateState: (input: string) => void) => {
        updateState(input);
        setErrorData(undefined);
    }

    return(
        <Modal>
            <section className="w-full max-h-min flex flex-col overflow-auto">
                <button onClick={closePortal} className="text-white text-2xl self-start hover:text-gray-400">&times;</button>
                <h3 className="text-white place-self-center text-3xl py-6">Create Account</h3>
                { errorData && <ErrorMessage data={errorData}/> }
                <form className="self-center w-full lg:w-8/12" onSubmit={handleSubmit} autoComplete="off">
                    <fieldset className="flex flex-col">
                        <section className="flex flex-col lg:flex-row gap-0 lg:gap-5">
                            <section className="flex flex-col w-full">
                                <label htmlFor="username" className="text-white text-lg p-2">Username</label>
                                <input type="text" value={username} onChange={(event) => handleInputChange(event.target.value, setUsername)} id="username" className="p-3 rounded-lg w-full" placeholder="Enter your username" required/>
                            </section>
                            <section className="flex flex-col w-full">
                                <label htmlFor="email" className="text-white text-lg p-2">Email</label>
                                <input type="text" value={email} onChange={(event) => handleInputChange(event.target.value, setEmail)} id="email" className="p-3 rounded-lg w-full" placeholder="Enter your email address" required/>
                            </section>
                        </section>

                        <label htmlFor="password" className="text-white text-lg p-2">Password</label>
                        <input type="password" value={password} onChange={(event) => handleInputChange(event.target.value, setPassword)} id="password" className="p-3 rounded-lg" placeholder="Enter your password" minLength={8} required/>

                        <label htmlFor="confirmpassword" className="text-white text-lg p-2">Confirm Password</label>
                        <input type="password" value={verifyPassword} onChange={(event) => handleInputChange(event.target.value, setVerifyPassword)} id="confirmpassword" className="p-3 rounded-lg" placeholder="Confirm your password" minLength={8} required/>
                    </fieldset>
                    <section>
                        <p className="text-white text-center py-3"><span className="cursor-pointer hover:underline animate-pulse">uwu</span></p>
                        <button onMouseDown={() => setIsMouseDown(true)} onMouseUp={() => setIsMouseDown(false)} className={`text-neutral-600 text-lg bg-neutral-300 border-2 border-neutral-300 rounded-lg w-full py-2 hover:text-neutral-900 hover:bg-neutral-600 hover:border-neutral-600 ${isMouseDown ? "scale-95" : ""}`}>Sign In</button>
                    </section>
                </form>
            </section>
        </Modal>
    );
}
export default CreateAccount;