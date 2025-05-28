import { useState, useEffect } from "react";
import ErrorMessage from "../../components/account/components/ErrorMessage";
import { useHandleLogout } from "../../hooks/useHandleLogout";
import { getAuth, sendEmailVerification } from "firebase/auth";
import { useNavigate } from "react-router-dom";

interface ErrorData{
    ok: boolean | undefined,
    message: string
}

const VerifyEmail = () => {
    const auth = getAuth();
    const user = auth.currentUser;

    const [ errorData, setErrorData ] = useState<ErrorData | undefined>(undefined);

    const handleLogout = useHandleLogout();

    const navigate = useNavigate();

    useEffect(() => {
        if(user?.emailVerified){
            navigate("/chat");
        }
    }, [auth.currentUser?.emailVerified]);

    const handleResendEmailVerification = () => {
        if(user) {
            sendEmailVerification(auth.currentUser);
            setErrorData({ ok: true, message: "Email has been resent." });
        } else {
            setErrorData({ ok: false, message: "An error has occured, try again later." });
        }
    }
    return(
        <div className="h-screen flex flex-col gap-4 justify-center items-center">
            <p className="text-white">Please verify your email before continuing.</p>
            <div className="mx-auto">
                { errorData && <ErrorMessage data={ errorData }/> }
            </div>
            <div className="flex flex-col gap-4">
                <button className="text-white bg-primary_blue border-primary_blue rounded-lg w-full p-3 hover:bg-primary_blue_darker" onClick={handleResendEmailVerification}>Resend Email</button>
                <button className="text-neutral-900 bg-neutral-300 border-2 border-neutral-300 rounded-lg w-full p-2 hover:bg-neutral-600 hover:border-neutral-600" onClick={handleLogout}>Go Back?</button>
            </div>
        </div>
    );
}
export default VerifyEmail;

//localStorage.removeItem("user");