import { createContext, useState, useContext,useEffect} from 'react';
import { jwtDecode } from 'jwt-decode';

// Create the context
const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userData, setUserData] = useState(null); // New state for user data

    const login = (token) => {
        sessionStorage.setItem('accessToken', token);
        const decodedToken = jwtDecode(token);
 // Decode the JWT to get the email
       
        setUserData(decodedToken); // Store user data (including email)
        setIsAuthenticated(true);
        console.log("Token stored in sessionStorage:", sessionStorage.getItem('accessToken'));  // Debugging step

    };

    const logout = () => {
        sessionStorage.removeItem('accessToken');
        setUserData(null);
        setIsAuthenticated(false);
    };
     
    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout, userData }}>
            {children}
        </AuthContext.Provider>
    );
};