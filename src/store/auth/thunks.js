import { signUserWithEmailPassword, registerUserWithEmailPassowrd, signInWithGoogle, signOut } from "../../firebase/providers";
import { clearNotesLogout } from "../journal/journalSlice";
import { checkingCredentials, login, logout } from "./"

export const startLoginWithEmailPassword = ({email, password}) => {
    return async(dispatch) => {
        dispatch(checkingCredentials());
        const result = await signUserWithEmailPassword({email, password});
        if(!result.ok) return dispatch(logout(result.errorMessage));
        dispatch(login(result));
    }
}

export const startGoogleSignIn = () => {
    return async(dispatch) => {
        dispatch(checkingCredentials());
        const result = await signInWithGoogle();
        if(!result.ok) return dispatch(logout(result.errorMessage))
        dispatch(login(result))
    }
}

export const startCreatingUserWithEmailPassword = ({email, password, displayName}) => {
    return async(dispatch) => {
        dispatch(checkingCredentials());
        const result = await registerUserWithEmailPassowrd({email, password, displayName})
        if(!result.ok) return dispatch(logout(result.errorMessage))
        dispatch(login(result));
    }
}

export const startLogout = () => {
    return async(dispatch) => {
        await signOut();
        dispatch(clearNotesLogout());
        dispatch(logout());
    }
}