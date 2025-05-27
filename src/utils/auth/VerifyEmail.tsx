import { useState } from "react";
import ErrorMessage from "../../components/account/components/ErrorMessage";
import handleLogout from "./Logout";
import { getAuth, sendEmailVerification } from "firebase/auth";

interface ErrorData{
    ok: boolean | undefined,
    message: string
}

const VerifyEmail = () => {
    const auth = getAuth();
    const user = auth.currentUser;

    const [ errorData, setErrorData ] = useState<ErrorData | undefined>(undefined);

    const handleResendEmailVerification = () => {
        if(user) {
            sendEmailVerification(auth.currentUser);
            setErrorData({ ok: true, message: "Email has been resent." });
        } else {
            setErrorData({ ok: false, message: "An error has occured, try again later." });
        }
    }
    return(
        <div className="h-screen flex flex-col justify-center items-center">
            <p className="text-white pb-2">Please verify your email before continuing.</p>
            { errorData && <ErrorMessage data={ errorData }/> }
            <button className="text-white bg-primary_blue border-primary_blue rounded-lg p-3 hover:bg-primary_blue_darker" onClick={handleResendEmailVerification}>Resend Email</button>
            <p className="text-white pt-2 cursor-pointer hover:underline" onClick={() => handleLogout()}> Go back?</p>
        </div>
    );
}
export default VerifyEmail;

//localStorage.removeItem("user");