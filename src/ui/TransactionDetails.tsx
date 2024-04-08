import { View, Text, StyleSheet } from "react-native"

export const TransactionDetails = () => {
    return (
        <View style={style.container}>
            <Text>Transaction History Screen</Text>
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