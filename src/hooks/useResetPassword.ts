import { getAuth, sendPasswordResetEmail } from "firebase/auth";

export const useResetPassword = () => {
    const auth = getAuth();
    const resetPassword = async () => {
        if(auth.currentUser?.email){
            await sendPasswordResetEmail(auth, auth.currentUser?.email);
        }
    };

    return resetPassword;
}