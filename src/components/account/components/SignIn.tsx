import { useState, FormEvent } from "react";
import { useAuth } from "../../../hooks/useAuth";
import { useData } from "../../../hooks/useData";
import { Navigate } from "react-router-dom";
import ErrorMessage from "./ErrorMessage";
import Modal from "../../../utils/ui-containers/Modal";
import { FirebaseError } from "firebase/app";

interface ErrorData{
    ok: boolean | undefined,
    message: string
}

interface LoginComponentInterface{
    closePortal: () => void;
}

const SignIn = ({ closePortal }: LoginComponentInterface) => {

    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ errorData, setErrorData ] = useState<ErrorData | undefined>(undefined);

    const { signInUser } = useAuth();
    const { retrieveUserDataFromDb } = useData();

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        //API Call
        try {
            await signInUser({ email, password });
            await retrieveUserDataFromDb(email);
        } catch(error) {
            if(error instanceof FirebaseError) setErrorData({ ok: false, message: error.code } );
        } finally {
            return <Navigate to="/chat"/>
        }
    }

    const handleInputChange = (input: string, updateState: (input: string) => void) => {
        updateState(input);
        setErrorData(undefined);
    }

    return(
        <Modal>
            <section className="w-full max-h-min flex flex-col overflow-auto">
                <button onClick={ closePortal } className="text-white text-2xl self-start hover:text-gray-400">&times;</button>
                <h3 className="text-white place-self-center text-3xl pt-8">Sign In</h3>
                <form className="self-center w-full lg:w-7/12" onSubmit={ handleSubmit } autoComplete="off">
                    <fieldset className="flex flex-col">
                        <fieldset>Personal Information</fieldset>
                        { errorData && <ErrorMessage data={ errorData }/> }
                        <label htmlFor="username" className="text-white text-lg p-2">Email</label>
                        <input type="email" value={ email } onChange={ (event) => handleInputChange(event.target.value, setEmail) } id="username" className="invalid:border-pink-500 p-3 rounded-lg" placeholder="Enter your email." required/>

                        <label htmlFor="password" className="text-white text-lg p-2 ">Password</label>
                        <input type="password" value={ password } onChange={ (event) => handleInputChange(event.target.value, setPassword) } id="password" className="p-3 rounded-lg" placeholder="Enter your password." required/>
                    </fieldset>
                    <section>
                        <p className="text-white text-center py-3"><span className="cursor-pointer hover:underline">Forgot Password?</span></p>
                        <button type="submit" className="text-neutral-900 text-lg bg-neutral-300 border-2 border-neutral-300 rounded-lg w-full py-2 hover:bg-neutral-600 hover:border-neutral-600 hover:scale-95">Sign In</button>
                    </section>
                </form>
            </section>
        </Modal>
    );
}
export default SignIn;