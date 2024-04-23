import { View, Text, StyleSheet } from "react-native";
import { RouteProp } from "@react-navigation/native";

import { Navigation } from "../../typings/navigation";
import { formatAmountWithDecimals, formatDate } from "../utils";
import { Separator } from "../components/Separator";
import { TransactionDetailItem } from "../components/TransactionDetailItem";

interface TransactionDetailsScreenProps extends Navigation.RootStackScreenProps<'TransactionDetails'> {
    route: RouteProp<Navigation.RootStackParamList, "TransactionDetails">;
}

export const TransactionDetailsScreen = (props: TransactionDetailsScreenProps) => {
    const { transaction } = props.route.params;

    return (
        <View style={styles.container}>
            <View style={styles.amountWrapper}>
                {transaction.type === 'CREDIT' ?
                    <Text style={styles.amount}>-RM{formatAmountWithDecimals(transaction.amount)}</Text>
                    :
                    <Text style={[styles.amount, { color: 'green' }]}>+RM{formatAmountWithDecimals(transaction.amount)}</Text>
                }
            </View>

            <View style={styles.contentContainer}>
                <TransactionDetailItem
                    title={'Date & Time'}
                    value={formatDate(transaction.date)}
                />
                <Separator />
                <TransactionDetailItem
                    title={'Transaction ID'}
                    value={transaction.id}
                />
                <Separator />
                <TransactionDetailItem
                    title={'Description'}
                    value={transaction.description}
                />
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    amountWrapper: {
        margin: 16,
    },
    amount: {
        marginVertical: 16,
        fontSize: 24,
        fontWeight: 'bold',
    },
    contentContainer: {
        paddingHorizontal: 16,
        backgroundColor: 'white',
    }
})