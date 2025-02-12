import { useState, FormEvent } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../config/firebaseAuth.js";
import { Navigate } from "react-router-dom";
import Modal from "../utils/Modal";

interface LoginComponentInterface{
    closePortal: () => void;
}

const SignIn = ({ closePortal }: LoginComponentInterface) => {

    const [ username, setUsername ] = useState("");
    const [ password, setPassword ] = useState("");

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        //Validation
        //API Call
        console.log(auth);
        try{
            await signInWithEmailAndPassword(auth, username, password);
            console.log(auth);
            return <Navigate to="/chat"/>

        }catch(error){
            alert(error);
        }
    }

    return(
        <Modal>
            <section className="w-full max-h-min flex flex-col overflow-auto">
                <button onClick={closePortal} className="text-white text-2xl self-start hover:text-gray-400">&times;</button>
                <h3 className="text-white place-self-center text-3xl pt-8">Sign In</h3>
                <form className="self-center w-full lg:w-7/12" onSubmit={handleSubmit} autoComplete="off">
                    <fieldset className="flex flex-col">
                        <fieldset>Personal Information</fieldset>
                        <label htmlFor="username" className="text-white text-lg p-2">Username</label>
                        <input type="text" value={username} onChange={(event) => setUsername(event.target.value)} id="username" className="p-3 rounded-lg" placeholder="Enter your username." required/>

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