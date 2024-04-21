import { StyleSheet, FlatList, SafeAreaView, RefreshControl, Switch, Text, View } from "react-native";
import * as LocalAuthentication from 'expo-local-authentication';
import { useEffect, useState } from "react";

import { HistoryListItem } from "../components/HistoryListItem";
import sampleTransactions from '../../../sampleTransactions.json';
import { Navigation } from "../../typings/navigation";
import { Separator } from "../components/Separator";

export const TransactionsHistoryScreen = ({ navigation }: Navigation.RootStackScreenProps<'TransactionHistory'>) => {
    const [refreshing, setRefreshing] = useState(false);
    const [transactions, setTransactions] = useState<Transaction.Data[]>([]);
    const [showAmounts, setShowAmounts] = useState<boolean>(false);

    useEffect(() => {
        const sortedTransactions: Transaction.Data[] = sortTransactions(sampleTransactions);
        setTransactions(sortedTransactions);
    }, []);

    const sortTransactions = (transactions: Transaction.Data[]) => {
        return transactions.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    }

    const handlePress = (selectedTransaction: Transaction.Data) => {
        navigation.navigate('TransactionDetails', { transaction: selectedTransaction });
    };

    const toggleSwitch = async () => {
        if (!showAmounts) {
            const result = await LocalAuthentication.authenticateAsync({
                promptMessage: 'Enter PIN to continue'
            });

            if (result.success) {
                setShowAmounts(true);
            }
        } else {
            setShowAmounts(false);
        }

    }

    const handleRefresh = () => {
        setRefreshing(true);
        setTimeout(() => {
            const hasNewTransaction = Math.random() < 0.5; // 50% chance of new transaction.
            if (hasNewTransaction) {
                const newTransactions: Transaction.Data[] = [{
                    id: `trx-${transactions.length + 1}`,
                    amount: 200,
                    date: new Date(new Date().getTime() - 60000).toISOString(), // 1 minitue ago.
                    description: 'Transfer to John',
                    type: 'CREDIT'
                },
                {
                    id: `trx-${transactions.length + 2}`,
                    amount: 350.50,
                    date: new Date().toISOString(),
                    description: 'Received from John',
                    type: 'DEBIT'
                }]
                setTransactions(sortTransactions([...newTransactions, ...transactions]));
            }

            setRefreshing(false);
        }, 1000);
    }

    return (
        <SafeAreaView style={style.container}>
            <View style={{ flexDirection: 'row', alignItems: 'center', padding: 16, justifyContent: 'flex-end' }}>
                <Text style={{ marginRight: 8 }}>Show/Hide Amounts</Text>
                <Switch
                    onValueChange={toggleSwitch}
                    value={showAmounts}
                />
            </View>
            <FlatList
                keyExtractor={(item) => item.id}
                style={{ paddingVertical: 8 }}
                data={transactions}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={handleRefresh}
                        title="Refreshing..."
                    />
                }
                renderItem={({ item }) =>
                    <HistoryListItem
                        transaction={item as Transaction.Data}
                        onPress={() => handlePress(item as Transaction.Data)}
                        showAmounts={showAmounts}
                    />
                }
                ItemSeparatorComponent={() => <Separator />}
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