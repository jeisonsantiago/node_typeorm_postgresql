import AppError from '../errors/AppError';
import { getCustomRepository } from 'typeorm';
import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

class DeleteTransactionService {
  public async execute(id:string): Promise<Transaction | undefined> {
    try {
      const transactionsRepository = getCustomRepository(TransactionsRepository);

      const findTransaction = await transactionsRepository.findOne({ where: { id: id } });
  
      if (findTransaction) {
        const res = await transactionsRepository.delete({ id: id });
        return findTransaction;
      }
    } catch (error) {
      throw new AppError("Transaction not found",400);
    }
  }
}

export default DeleteTransactionService;
