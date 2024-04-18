import { View, Text, StyleSheet, Button, FlatList, SafeAreaView } from "react-native"
import { HistoryListItem } from "../components/HistoryListItem";
import sampleTransactions from '../../../sampleTransactions.json';
import { Navigation } from "../../typings/navigation";
import { Separator } from "../components/Separator";

export const TransactionsHistoryScreen = ({ navigation }: Navigation.RootStackScreenProps<'TransactionHistory'>) => {
    const handlePress = (id: number) => {
        navigation.navigate('TransactionDetails', { transactionId: id });
    };

    return (
        <SafeAreaView style={style.container}>
            <FlatList
                keyExtractor={(item) => item.id.toString()}
                style={{ paddingVertical: 8 }}
                data={sampleTransactions}
                renderItem={({ item, index }) =>
                    <>
                        <HistoryListItem
                            transaction={item as Transaction.Data}
                            onPress={() => handlePress(item.id)}
                        />
                        {index !== sampleTransactions.length - 1 &&
                            <Separator />
                        }
                    </>

                }
                
            />
        </SafeAreaView>
    )
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    }
});