import { ReactNode, createContext, useState } from "react";

export const AuthenticationContext = createContext<Authentication.ContextType | null>(null);

interface ProviderProps {
    children: ReactNode;
}

const AuthenticationProvider = (props: ProviderProps) => {
    const [isAuthenticated, setAuthenticated] = useState<boolean>(false);

    const setIsAuthenticated = (value: boolean) => {
        setAuthenticated(value);
    }

    return (
        <AuthenticationContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
            {props.children}
        </AuthenticationContext.Provider>
    )
}
export default AuthenticationProvider;
