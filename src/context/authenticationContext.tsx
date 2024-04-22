import { ReactNode, createContext, useEffect, useState } from "react";
import * as LocalAuthentication from 'expo-local-authentication';
import * as SecureStore from 'expo-secure-store';

export const AuthenticationContext = createContext<Authentication.ContextType | null>(null);

interface ProviderProps {
    children: ReactNode;
}

const AuthenticationProvider = (props: ProviderProps) => {
    const [isAuthenticated, setAuthenticated] = useState<boolean>(false);
    const [isBiometricsEnabled, setIsBiometricsEnabled] = useState<boolean>(false);
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [passwordError, setPasswordError] = useState<string>('');

    useEffect(() => {
        getUsername();
        checkIfBiometricsEnabled();
        saveUsernameAndPassword();
    }, []);

    const updateAuthentication = (value: boolean) => {
        setAuthenticated(value);
        resetInputState();
    }

    const authenticate = async () => {
        try {
            const auth = await LocalAuthentication.authenticateAsync({
                promptMessage: 'Login with Biometrics'
            });

            if (auth.success) {
                updateAuthentication(auth.success);
            } else {
                console.log('Authentication failed, reason: ', auth);
            }
        } catch (e) {
            console.log('Authentication failed, error: ', e);
        }
    }

    const checkIfBiometricsEnabled = async () => {
        try {
            const hasHardware = await LocalAuthentication.hasHardwareAsync();
            const isEnrolled = await LocalAuthentication.isEnrolledAsync();
            if (hasHardware && isEnrolled) {
                setIsBiometricsEnabled(true);
            } else {
                setIsBiometricsEnabled(false);
            }
        } catch (e) {
            console.log('isBiometricsEnabled failed, error: ', e);
            setIsBiometricsEnabled(false);
        }
    }

    const saveUsernameAndPassword = async () => {
        try {
            await SecureStore.setItemAsync('username', 'Marry');
            await SecureStore.setItemAsync('password', 'demo1234567890');
        } catch (e) {
            console.log('saveUsernameAndPassword failed, error: ', e);

        }
    }

    const handleLoginWithPassword = async () => {
        try {
            setPasswordError('');
            const storePassword = await SecureStore.getItemAsync('password');

            if (password.trim() === '') {
                setPasswordError('Please enter your password.');
            }
            if (password !== storePassword) {
                setPasswordError('Invalid password.');
            }
            if (password.trim() !== '' && password === storePassword) {
                updateAuthentication(true);
            }
        } catch (e) {
            console.log('handleLoginWithPassword failed, error: ', e)
        }

    };

    const getUsername = async () => {
        try {
            const username = await SecureStore.getItemAsync('username');
            if(username){
                setUsername(username);
            }
        } catch (e) {
            console.log('getUsername failed, error: e');
            return '';
        }
    }

    const resetInputState = () => {
        setPassword('');
        setPasswordError('');
    };

    const initialValue: Authentication.ContextType = {
        isAuthenticated,
        isBiometricsEnabled,
        password,
        passwordError,
        username,
        authenticate,
        handleLoginWithPassword,
        setPassword,
        setPasswordError,
        setUsername,
        updateAuthentication,
    };

    return (
        <AuthenticationContext.Provider value={initialValue}>
            {props.children}
        </AuthenticationContext.Provider>
    )
}
export default AuthenticationProvider;
