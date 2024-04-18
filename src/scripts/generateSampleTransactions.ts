import fs from 'fs';

function generateSampleTransactions(total: number) {
    const transactions = [];
    for (let i = 0; i < total; i++) {
        const transactionData = {
            id: i + 1,
            amount: parseFloat((Math.random() * 10000).toFixed(2)),
            date: new Date().toISOString(),
            description: `Transaction ${i}`,
            type: i % 2 === 0 ? 'CREDIT' : 'DEBIT'
        };

        transactions.push(transactionData);
    }
    return transactions;
}

const sampleTransactions = generateSampleTransactions(20);

const jsonData = JSON.stringify(sampleTransactions, null, 2);

fs.writeFileSync('sampleTransactions.json', jsonData);
