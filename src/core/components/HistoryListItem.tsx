import { View, Text, StyleSheet, TouchableOpacity } from "react-native"
import { formatDateToDDMMYYYY, formatAmountWithDecimals } from "../utils";

interface HistoryListItemProps {
    transaction: Transaction.Data;
    onPress: () => void;
}

export const HistoryListItem = (props: HistoryListItemProps) => {
    const { transaction, onPress } = props;

    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
            <View style={styles.wrapper}>
                <Text style={styles.date}>{formatDateToDDMMYYYY(transaction.date)}</Text>
                <Text style={styles.description}>{transaction.description}</Text>
            </View>
            <View style={styles.amountWrapper}>
                {transaction.type === 'CREDIT' ?
                    <Text style={styles.creditAmount}>-RM{formatAmountWithDecimals(transaction.amount)}</Text>
                    :
                    <Text style={styles.debitAmount}>+RM{formatAmountWithDecimals(transaction.amount)}</Text>
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
    creditAmount: {
        fontSize: 18,
        fontWeight: '500',
        color: 'black',
    },
    debitAmount: {
        fontSize: 18,
        fontWeight: '500',
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