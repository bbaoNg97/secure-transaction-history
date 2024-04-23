import { StyleSheet, FlatList, SafeAreaView, RefreshControl, Switch, Text, View, ListRenderItem } from "react-native";
import * as LocalAuthentication from 'expo-local-authentication';
import { useEffect, useState } from "react";

import { TransactionHistoryListItem } from "../components/TransactionHistoryListItem";
import sampleTransactions from '../../../sampleTransactions.json';
import { Navigation } from "../../typings/navigation";
import { Separator } from "../components/Separator";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

interface TransactionHistoryScreenProps extends Navigation.RootStackScreenProps<'TransactionHistory'> {
    navigation: NativeStackNavigationProp<Navigation.RootStackParamList, "TransactionHistory">

}
export const TransactionsHistoryScreen = (props: TransactionHistoryScreenProps) => {
    const { navigation } = props;

    const [refreshing, setRefreshing] = useState(false);
    const [transactions, setTransactions] = useState<Transaction.Response[]>([]);
    const [showAmounts, setShowAmounts] = useState<boolean>(false);

    useEffect(() => {
        const sortedTransactions: Transaction.Response[] = sortTransactions(sampleTransactions);
        setTransactions(sortedTransactions);
    }, []);

    const sortTransactions = (transactions: Transaction.Response[]) => {
        return transactions.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    }

    const handlePress = (selectedTransaction: Transaction.Response) => {
        navigation.navigate('TransactionDetails', { transaction: selectedTransaction });
    };

    const toggleSwitch = async () => {
        try {
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
        } catch (e) {
            console.log('Oops! error:', e);
        }
    }

    const handleRefresh = () => {
        setRefreshing(true);
        setTimeout(() => {
            const hasNewTransaction = Math.random() < 0.5; // 50% chance of new transaction.
            if (hasNewTransaction) {
                const newTransactions: Transaction.Response[] = [{
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

    const renderRefreshControl = () => {
        return (
            <RefreshControl
                refreshing={refreshing}
                onRefresh={handleRefresh}
                title="Refreshing..." />
        )
    }

    const renderItem: ListRenderItem<Transaction.Response> | null | undefined = ({ item }) => (
        <TransactionHistoryListItem
            transaction={item}
            onPress={() => handlePress(item)}
            showAmounts={showAmounts}
        />
    )

    return (
        <SafeAreaView style={styles.container}>
            {transactions.length === 0 ?
                <View style={styles.emptyList}>
                    <Text>No Transaction History</Text>
                </View>
                :
                <>
                    <View style={styles.switchContainer}>
                        <Text style={styles.amountText}>Show/Hide Amounts</Text>
                        <Switch
                            onValueChange={toggleSwitch}
                            value={showAmounts}
                        />
                    </View>
                    <FlatList
                        keyExtractor={(item) => item.id}
                        style={styles.list}
                        data={transactions}
                        refreshControl={renderRefreshControl()}
                        renderItem={renderItem}
                        ItemSeparatorComponent={() => <Separator />}
                    />
                </>
            }

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    emptyList: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    switchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        justifyContent: 'flex-end'
    },
    amountText: {
        marginRight: 8.
    },
    list: {
        paddingVertical: 8,
    }
});