import fs from 'fs';

// Generate a random amount with fixed decimal points.
function generateRandomAmount(): number {
    const minAmount = 0;
    const maxAmount = 9999;
    const randomAmount = Math.random() * (maxAmount - minAmount) + minAmount;
    return parseFloat(randomAmount.toFixed(2));
}

function generateSampleTransactions(total: number) {
    const transactions = [];
    for (let i = 0; i < total; i++) {
        const transactionData = {
            id: `trx-${(i + 1).toLocaleString('en-US', { minimumIntegerDigits: 2 })}`,
            amount: generateRandomAmount(),
            date: new Date().toISOString(),
            description: `Transaction ${i + 1}`,
            type: i % 2 === 0 ? 'CREDIT' : 'DEBIT'
        };

        transactions.push(transactionData);
    }
    return transactions;
}

const sampleTransactions = generateSampleTransactions(20);

const jsonData = JSON.stringify(sampleTransactions, null, 2);

fs.writeFileSync('sampleTransactions.json', jsonData);
