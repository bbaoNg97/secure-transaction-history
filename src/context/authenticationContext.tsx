import { ReactNode, createContext, useState } from "react";
import * as LocalAuthentication from 'expo-local-authentication';

export const AuthenticationContext = createContext<Authentication.ContextType | null>(null);

interface ProviderProps {
    children: ReactNode;
}

const AuthenticationProvider = (props: ProviderProps) => {
    const [isAuthenticated, setAuthenticated] = useState<boolean>(false);

    const setIsAuthenticated = (value: boolean) => {
        setAuthenticated(value);
    }

    const authenticate = async () => {
        const auth = await LocalAuthentication.authenticateAsync();

        if (auth.success) {
            setIsAuthenticated(auth.success);
        } else {
            console.log('Authentication failed, reason: ', auth);
        }
    }

    return (
        <AuthenticationContext.Provider value={{ isAuthenticated, setIsAuthenticated, authenticate }}>
            {props.children}
        </AuthenticationContext.Provider>
    )
}
export default AuthenticationProvider;
