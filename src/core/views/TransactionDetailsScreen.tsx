import { View, Text, StyleSheet } from "react-native"
import { Navigation } from "../../typings/navigation"

export const TransactionDetailsScreen = ({ route }: Navigation.RootStackScreenProps<'TransactionDetails'>) => {
    return (
        <View style={style.container}>
            <Text>Transaction History Screen with id {route.params.transactionId}</Text>
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