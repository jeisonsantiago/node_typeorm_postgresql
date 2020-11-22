import Transaction from '../models/Transaction';
import { EntityRepository, Repository } from 'typeorm';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

@EntityRepository(Transaction)
class TransactionsRepository extends Repository<Transaction> {
  public async getBalance(): Promise<Balance> { // replace void with Balance

    const transactions = await this.find();

    const balance: Balance = { income: 0, outcome: 0, total: 0 };

    transactions.forEach((transaction) => {
      balance.income += (transaction.type === 'income') ? transaction.value : 0;
      balance.outcome += (transaction.type === 'outcome') ? transaction.value : 0;
    })
    balance.total = (balance.income - balance.outcome);

    return balance;
  }
}

export default TransactionsRepository;
