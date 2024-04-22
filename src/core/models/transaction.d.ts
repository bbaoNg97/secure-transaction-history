declare namespace Transaction {
  type TransactionType = 'DEBIT' | 'CREDIT';

  interface Response {
    id: string;
    amount: number;
    date: string;
    description: string;
    type: string | TransactionType;
  }
}
