import { Text, StyleSheet, SafeAreaView, Pressable, View, TextInput } from "react-native";
import { useContext } from "react";

import { AuthenticationContext } from "../../context/authenticationContext";

export const AuthenticationScreen = () => {
    const {
        isBiometricsEnabled,
        password,
        passwordError,
        username,
        authenticate,
        handleLoginWithPassword,
        setPassword,
    } = useContext(AuthenticationContext) as Authentication.ContextType;

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.intro}>
                <Text style={styles.greetingText}>Hello {username}</Text>
                <Text>Welcome back!</Text>
            </View>

            <View style={styles.inputContainer}>
                <View style={styles.inputView}>
                    <TextInput
                        style={styles.inputText}
                        secureTextEntry
                        placeholder="Password"
                        placeholderTextColor="#003f5c"
                        onChangeText={(value) => setPassword(value)}
                        value={password}
                    />
                </View>
                {passwordError ? <Text style={{ color: 'red', marginBottom: 10 }}>{passwordError}</Text> : null}
            </View>

            <View style={{ marginTop: 16, width: '100%' }}>
                <Pressable style={styles.button} onPress={handleLoginWithPassword}>
                    <Text style={styles.buttonText}>LOGIN</Text>
                </Pressable>
                {isBiometricsEnabled &&
                    <Pressable style={styles.button} onPress={authenticate}>
                        <Text style={styles.buttonText}>BIOMETRICS LOGIN</Text>
                    </Pressable>
                }
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 32,
    },
    intro: {
        marginBottom: 32,
        alignItems: 'center'
    },
    greetingText: {
        fontSize: 24,
        fontWeight: '600',
        paddingBottom: 16,
    },
    button: {
        paddingVertical: 16,
        backgroundColor: '#000000',
        borderRadius: 8,
        marginBottom: 16,
    },
    buttonText: {
        textAlign: 'center',
        color: '#ffffff',
    },
    inputContainer: {
        width: '100%',
        marginBottom: 16,
    },
    inputView: {
        backgroundColor: "#3AB4BA",
        borderRadius: 8,
        justifyContent: "center",
        padding: 16,
    },
    inputText: {
        color: "white"
    },
})