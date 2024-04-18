import { View, Text, StyleSheet, Button } from "react-native"
import { Navigation } from "../typings/navigation"

export const TransactionsHistoryScreen = ({ navigation }: Navigation.RootStackScreenProps<'TransactionHistory'>) => {

    const handlePress = () => {
        navigation.navigate('TransactionDetails', { transactionId: '123' });
    };

    return (
        <View style={style.container}>
            <Text>Transaction History Screen</Text>
            <Button onPress={handlePress} title="Navigate to Details screen" />
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