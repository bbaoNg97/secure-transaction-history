declare namespace Authentication {
    interface ContextType {
        isAuthenticated: boolean;
        isBiometricsEnabled: boolean;
        username: string;
        password: string;
        passwordError: string;

        authenticate: () => Promise<void>;
        handleLoginWithPassword: () => Promise<void>;
        setPassword: React.Dispatch<React.SetStateAction<string>>;
        setPasswordError: React.Dispatch<React.SetStateAction<string>>;
        setUsername: React.Dispatch<React.SetStateAction<string>>;
        updateAuthentication: (value: boolean) => void;
    }
}