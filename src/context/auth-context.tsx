import {createContext, useContext, useState, ReactNode, FC} from 'react';
import {IUser} from "@/src/types/user";

interface AuthContextType {
    isAuthenticated: boolean;
    userData: IUser | null;
    login: (userData: IUser) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: FC<AuthProviderProps> = ({children}) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [userData, setUserData] = useState<IUser | null>(null);

    function login(userData: IUser) {
        setIsAuthenticated(true)
        setUserData(userData)
    }

    function logout() {
        setIsAuthenticated(false)
        setUserData(null)
    }

    return (
        <AuthContext.Provider value={{isAuthenticated, userData, login, logout}}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

