import {createContext, useEffect, useState} from "react";
import {login, logout} from "../api/authService";
/* Stock les infos du user , permet de se connecter et se deconnecter
* rècupère le token depuis le stockage local */

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const accessToken = localStorage.getItem("access_token");
        if(accessToken) {
            setUser({username: "Utilisateur"}); //juste temporaire
        }
    }, []);
    const handleLogin = async (username, password) => {
        const data = await login(username, password);
        if(data.access_token) {
            localStorage.setItem("access_token", data.access_token);
            localStorage.setItem("refresh_token", data.refresh_token);
            setUser(data.user);
            return true
        }

        return false ;
    };

    const handleLogout = () => {
        logout();
        setUser(null);
    };
    return (
        <AuthContext.Provider value={{user, handleLogin, handleLogout }}>
            {children}
        </AuthContext.Provider>
    );
};