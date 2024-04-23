import { View, Text, StyleSheet} from "react-native";

interface TransactionDetailItemProps {
    title: string;
    value: any;
}

export const TransactionDetailItem = (props: TransactionDetailItemProps) => {
    const { title, value } = props;
    
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.description}>{value}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
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