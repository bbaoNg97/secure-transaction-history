declare namespace Authentication {
    interface ContextType {
        isAuthenticated: boolean;
        setIsAuthenticated: (value: boolean) => void;
    }
}