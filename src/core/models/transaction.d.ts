declare namespace Transaction {
  interface State {
    selectedTransaction: Data;
    transactions: Data[];
  }

  type TransactionType = 'DEBIT' | 'CREDIT';

  interface Data {
    id: string;
    amount: number;
    date: string;
    description: string;
    type: string | TransactionType;
  }
}
