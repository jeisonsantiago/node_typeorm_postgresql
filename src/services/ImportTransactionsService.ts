import Transaction from '../models/Transaction';

import uploadConfig from '../config/upload';

import path from 'path'

import CreateTransactionService from './CreateTransactionService';
import loadCSV from '../utils/parseCSV';


class ImportTransactionsService {
  async execute(filename: string): Promise<Transaction[] | null> {
    // TODO

    const file_url = path.join(uploadConfig.directory, filename);

    const createTransaction = new CreateTransactionService();

    const rawArray = await loadCSV(file_url);

    let result: Transaction[] = [];

    for await (const transaction of rawArray) {
      const tr = await createTransaction.execute({
        title: transaction[0],
        value: Number(transaction[2]),
        type: transaction[1],
        category_name: transaction[3]
      });
      result.push(tr);
    }

    return result;
  }
}

export default ImportTransactionsService;
