import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

import { formatDateToDDMMYYYY, formatAmountWithDecimals } from "../utils";

interface TransactionHistoryListItemProps {
    transaction: Transaction.Response;
    onPress: () => void;
    showAmounts: boolean;
}

export const TransactionHistoryListItem = (props: TransactionHistoryListItemProps) => {
    const { transaction, onPress, showAmounts } = props;

    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
            <View style={styles.wrapper}>
                <Text style={styles.date}>{formatDateToDDMMYYYY(transaction.date)}</Text>
                <Text style={styles.description}>{transaction.description}</Text>
            </View>
            <View style={styles.amountWrapper}>
                {!showAmounts ?
                    <Text style={styles.amount}>RM****</Text> :
                    transaction.type === 'CREDIT' ?
                        <Text style={[styles.amount, styles.creditAmount]}>-RM{formatAmountWithDecimals(transaction.amount)}</Text>
                        :
                        <Text style={[styles.amount, styles.debitAmount]}>+RM{formatAmountWithDecimals(transaction.amount)}</Text>
                }

            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 16,
        marginVertical: 8,
    },
    amountWrapper: {
        alignItems: 'flex-end'
    },
    amount: {
        fontSize: 18,
        fontWeight: '500',
    },
    creditAmount: {
        color: 'black',
    },
    debitAmount: {
        color: 'green',
    },
    wrapper: {
        marginBottom: 8,
    },
    date: {
        fontSize: 12,
        color: 'blue'
    },
    description: {
        fontSize: 18,
    }
});