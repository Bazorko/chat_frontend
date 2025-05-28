import { useAuth } from "./useAuth";
import { disconnect } from "../socketstuff/ConnectionManager";

export const useHandleLogout = () => {
    const { logout } = useAuth();

    const handleLogout = () => {
        disconnect();
        localStorage.removeItem("user");
        logout();
    };

    return handleLogout;
}