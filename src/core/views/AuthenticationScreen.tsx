import { Text, StyleSheet, SafeAreaView, Pressable } from "react-native";
import { useContext } from "react";

import { AuthenticationContext } from "../../context/authenticationContext";

export const AuthenticationScreen = () => {
    const { authenticate } = useContext(AuthenticationContext) as Authentication.ContextType;

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.greetingText}>Hello there</Text>
            <Text>Welcome back!</Text>
            <Pressable style={styles.button} onPress={authenticate}>
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
    greetingText: {
        fontSize: 18,
        fontWeight: '600',
        paddingBottom: 16,
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