import { useState } from "react";
import { useData } from "../../../hooks/useData";
import { useResetPassword } from "../../../hooks/useResetPassword";
import { useHandleLogout } from "../../../hooks/useHandleLogout";
import ErrorMessage from "./ErrorMessage";

interface ErrorData{
    ok: boolean | undefined,
    message: string
}

const AccountList = () => {
    const { user } = useData();
    const resetPassword = useResetPassword();
    const handleLogout = useHandleLogout();

    const [ errorData, setErrorData ] = useState<ErrorData | undefined>(undefined);
    return (
        <section className="self-center">
            <p className="text-white text-center text-2xl p-5">{ user.username }'s Account</p>
            { errorData && <ErrorMessage data={errorData}/> }
            <ul className="p-5 text-white text-center">
                <li className="p-5 cursor-pointer" onClick={() => { 
                    resetPassword();
                    setErrorData({ ok: true, message: "A password reset link was sent to your email." }); 
                } }>Change Password</li>
                <li className="p-5 cursor-pointer" onClick={handleLogout}>Sign Out</li>
            </ul>
        </section>
    )
}

export default AccountList;
