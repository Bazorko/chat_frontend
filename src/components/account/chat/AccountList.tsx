import { useAuth } from "../../../hooks/useAuth";

const AccountList = () => {
    const { logout } = useAuth();
    return (
        <section className="self-center">
            <p className="text-white text-center text-2xl p-5">Account</p>
            <ul className="p-5 text-white text-center">
                <li className="p-5">Change Password</li>
                <li className="p-5" onClick={logout}>Sign Out</li>
            </ul>
        </section>
    )
}

export default AccountList;
