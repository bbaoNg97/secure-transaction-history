import { Text, StyleSheet, SafeAreaView, Pressable } from "react-native";
import * as LocalAuthentication from 'expo-local-authentication';
import { useContext } from "react";

import { AuthenticationContext } from "../../context/authenticationContext";

export const AuthenticationScreen = () => {
    const { setIsAuthenticated } = useContext(AuthenticationContext) as Authentication.ContextType;

    const login = async () => {
        const auth = await LocalAuthentication.authenticateAsync();

        if (auth.success) {
            setIsAuthenticated(auth.success);
        } else {
            console.log('Authentication failed, reason: ', auth.error);
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <Text style={{ fontSize: 18, fontWeight: '600', paddingBottom: 16 }}>Hello there</Text>
            <Text>Welcome back!</Text>
            <Pressable style={styles.button} onPress={login}>
                <Text style={styles.buttonText}>Login</Text>
            </Pressable>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    button: {
        marginTop: 32,
        paddingVertical: 16,
        paddingHorizontal: 64,
        backgroundColor: '#000000',
        borderRadius: 8
    },
    buttonText: {
        color: '#ffffff'
    }
})