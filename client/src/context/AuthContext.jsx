import {
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);

    const [token, setToken] = useState(null);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const storedUser = localStorage.getItem("user");

        const storedToken = localStorage.getItem("token");

        if (storedUser && storedToken) {

            setUser(JSON.parse(storedUser));

            setToken(storedToken);

        }

        setLoading(false);

    }, []);

    const login = (userData, jwtToken) => {

        localStorage.setItem(
            "user",
            JSON.stringify(userData)
        );

        localStorage.setItem(
            "token",
            jwtToken
        );

        setUser(userData);

        setToken(jwtToken);

    };

    const logout = () => {

        localStorage.removeItem("user");

        localStorage.removeItem("token");

        setUser(null);

        setToken(null);

    };

    const value = {

        user,

        token,

        loading,

        login,

        logout,

        isAuthenticated: !!token,

    };

    return (

        <AuthContext.Provider value={value}>

            {children}

        </AuthContext.Provider>

    );

};

export const useAuth = () => useContext(AuthContext);