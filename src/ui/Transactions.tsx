import { View, Text, StyleSheet } from "react-native"

export const Transactions = () => {
    return (
        <View style={style.container}>
            <Text>Transactions Screen</Text>
        </View>
    )
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})