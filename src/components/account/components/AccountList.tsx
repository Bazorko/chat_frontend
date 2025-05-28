import { useData } from "../../../hooks/useData";
import { useResetPassword } from "../../../hooks/useResetPassword";
import { useHandleLogout } from "../../../hooks/useHandleLogout";

const AccountList = () => {
    const { user } = useData();
    const resetPassword = useResetPassword();
    const handleLogout = useHandleLogout();
    return (
        <section className="self-center">
            <p className="text-white text-center text-2xl p-5">{ user.username }'s Account</p>
            <ul className="p-5 text-white text-center">
                <li className="p-5 cursor-pointer" onClick={resetPassword}>Change Password</li>
                <li className="p-5 cursor-pointer" onClick={handleLogout}>Sign Out</li>
            </ul>
        </section>
    )
}

export default AccountList;
