import { disconnect } from "../../socketstuff/ConnectionManager";
import { useAuth } from "../../hooks/useAuth";
const VerifyEmail = () => {
    const { logout } = useAuth();
    const handleLogout = () => {
        disconnect();
        localStorage.removeItem("user");
        logout();
    }
    return(
        <div className="h-screen flex flex-col justify-center items-center">
            <p className="text-white pb-2">Please verify your email before continuing.</p>
            <p className="text-white pt-2 cursor-pointer hover:underline" onClick={() => handleLogout()}> Go back?</p>
        </div>
    );
}
export default VerifyEmail;

//localStorage.removeItem("user");