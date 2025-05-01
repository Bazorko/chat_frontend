import { useAuth } from "../../../hooks/useAuth";
import { useData } from "../../../hooks/useData";

const AccountList = () => {
    const { logout } = useAuth();
    const { user } = useData();
    const handleLogout = () => {
        localStorage.removeItem("user");
        logout();
    }
    return (
        <section className="self-center">
            <p className="text-white text-center text-2xl p-5">{ user.username }'s Account</p>
            <ul className="p-5 text-white text-center">
                <li className="p-5">Change Password</li>
                <li className="p-5" onClick={() => handleLogout()}>Sign Out</li>
            </ul>
        </section>
    )
}

export default AccountList;
