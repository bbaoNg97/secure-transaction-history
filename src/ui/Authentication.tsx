import { View, Text, StyleSheet } from "react-native"

export const Authentication = () => {
    return (
        <View style={styles.container}>
            <Text>Biometrics login</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})