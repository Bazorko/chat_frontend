import { useAuth } from "../../hooks/useAuth";
import { disconnect } from "../../socketstuff/ConnectionManager";

const { logout } = useAuth();

const handleLogout = () => {
    disconnect();
    localStorage.removeItem("user");
    logout();
}

export default handleLogout;