import { View, Text, StyleSheet } from "react-native"
import { Navigation } from "../../typings/navigation"
import { formatAmountWithDecimals, formatDate } from "../utils";
import { Separator } from "../components/Separator";

export const TransactionDetailsScreen = ({ route }: Navigation.RootStackScreenProps<'TransactionDetails'>) => {
    const { transaction } = route.params;

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
                <View style={styles.titleDescriptionContainer}>
                    <Text style={styles.title}>Date & Time</Text>
                    <Text style={styles.description}>{formatDate(transaction.date)}</Text>
                </View>
                <Separator />
                <View style={styles.titleDescriptionContainer}>
                    <Text style={styles.title}>Transaction ID</Text>
                    <Text style={styles.description}>{transaction.id}</Text>
                </View>
                <Separator />
                <View style={styles.titleDescriptionContainer}>
                    <Text style={styles.title}>Description </Text>
                    <Text style={styles.description}>{transaction.description}</Text>
                </View>
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

    },
    titleDescriptionContainer: {
        marginVertical: 16,
    },
    title: {
        fontSize: 12,
        fontWeight: '300'
    },
    description: {
        fontSize: 18,
    }
})