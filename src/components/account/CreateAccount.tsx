import { useState, FormEvent } from "react";
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, firestore } from '../../config/firebaseAuth';
import { Navigate } from "react-router-dom";
import Modal from "../utils/Modal";

interface CreateAccountComponentInterface{
    closePortal: () => void;
}

const CreateAccount = ({ closePortal }: CreateAccountComponentInterface) => {

    const [ isMouseDown, setIsMouseDown ] = useState(false);

    const [ username, setUsername ] = useState("");
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ verifyPassword, setVerifyPassword ] = useState("");

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        //Validation

        try{
            //Creates new user.
            const credentials = await createUserWithEmailAndPassword(auth, email, password);
            console.log(credentials);

            //Stores additional data in firestore.
            const user = credentials.user;
            await setDoc(doc(firestore, "user", user.uid), {
                username, email
            });
            return <Navigate to="/chat"/>
        }catch(error){
            console.log(error);
        }
    }

    return(
        <Modal>
            <section className="w-full max-h-min flex flex-col overflow-auto">
                <button onClick={closePortal} className="text-white text-2xl self-start hover:text-gray-400">&times;</button>
                <h3 className="text-white place-self-center text-3xl pt-8">Create Account</h3>
                <form className="self-center w-full lg:w-8/12" onSubmit={handleSubmit} autoComplete="off">
                    <fieldset className="flex flex-col">
                        <fieldset>Personal Information</fieldset>
                        <section className="flex flex-col lg:flex-row gap-0 lg:gap-5">
                            <section className="flex flex-col w-full">
                                <label htmlFor="username" className="text-white text-lg p-2">Username</label>
                                <input type="text" value={username} onChange={(event) => setUsername(event.target.value)} id="username" className="p-3 rounded-lg w-full" placeholder="Enter your username" required/>
                            </section>
                            <section className="flex flex-col w-full">
                                <label htmlFor="email" className="text-white text-lg p-2">Email</label>
                                <input type="text" value={email} onChange={(event) => setEmail(event.target.value)} id="email" className="p-3 rounded-lg w-full" placeholder="Enter your email address" required/>
                            </section>
                        </section>

                        <label htmlFor="password" className="text-white text-lg p-2">Password</label>
                        <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} id="password" className="p-3 rounded-lg" placeholder="Enter your password" required/>

                        <label htmlFor="confirmpassword" className="text-white text-lg p-2">Confirm Password</label>
                        <input type="password" value={verifyPassword} onChange={(event) => setVerifyPassword(event.target.value)} id="confirmpassword" className="p-3 rounded-lg" placeholder="Confirm your password" required/>
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