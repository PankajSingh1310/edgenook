import { createContext, useContext, useState } from 'react';

const userContext = createContext();

export const useUser = () => {
    const context = useContext(userContext);
    if (!context) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
}

export const UserState = ({ children }) => { 
    const [userData, setUserData] = useState(null);
    const [token, setToken] = useState(null);
    const [isLoggedIn, setzIsLoggedIn] = useState(false);
    const [error, setError] = useState(null);

    return (
        <userContext.Provider value={{ userData, setUserData, token, setToken, isLoggedIn, setIsLoggedIn, error, setError }}>
            {children}
        </userContext.Provider>
    );
}

export default userContext;
