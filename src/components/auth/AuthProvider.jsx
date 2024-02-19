import { useContext, createContext, useState, useEffect } from "react";
import axios from "axios";
import endpoints from "../../utils";

const AuthContext = createContext({
    isAuthenticated: false,
    saveUser: (_userData) => {},
    getUser: () => ({}),
    signout: () => {},
});

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isloading, setIsLoading] = useState(true);
    
    function saveUser(userData) {
        const user = {
            username: userData.username,
            role: userData.role,
        }

        setUser(user);
        localStorage.setItem("user", JSON.stringify(user));
        setIsAuthenticated(true);
    }

    function getUser() {
        if (user) {
            console.log("Usuario almacenado con useState: " + user.username);
            return user;
        }

        const userStorage = localStorage.getItem("user");
        if (userStorage) {
            console.log("Usuario almacenado con localStorage: " + JSON.parse(userStorage).username);
            setUser(JSON.parse(userStorage));
            setIsAuthenticated(true);
        }
        return userStorage;
    }

    async function signout() {
        try{
            const response = await axios.post(endpoints.logout, {}, { withCredentials: true });
        } catch (error) {
            return console.error(error);
        }
        localStorage.removeItem("user");
        setUser(null);
        setIsAuthenticated(false);
    }

    async function checkAuth() {
        const user = getUser();
        setIsLoading(false);
    }

    useEffect(() => {
        checkAuth();
    }, []);

    return (
        <AuthContext.Provider
            value={{
                isAuthenticated,
                saveUser,
                getUser,
                signout,
            }}
        >
            {isloading ? <div>Loading...</div> : children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
