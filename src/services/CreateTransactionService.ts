// import AppError from '../errors/AppError';

import { getCustomRepository, getRepository } from 'typeorm';
import Category from '../models/Category';
import Transaction from '../models/Transaction';

import TransactionsRepository from '../repositories/TransactionsRepository';

interface Request {
  title: string;
  value: number;
  type: 'income' | 'outcome';
  category_name: string;
}

class CreateTransactionService {
  public async execute({ title, value, type, category_name }: Request): Promise<Transaction> {
    // TODO
    const transactionRepository = getCustomRepository(TransactionsRepository);

    // check if has transaction 
    const categoryRepository = getRepository(Category);

    let findCategory = await categoryRepository.findOne({
      where: { title: category_name }
    });

    if (!findCategory) {
      const newCat = categoryRepository.create({
        title: category_name,
      });

      await categoryRepository.save(newCat);
      findCategory = newCat;
    }

    const transaction = transactionRepository.create({
      title,
      value,
      type,
      category: findCategory,
    });

    // check balance
    const balance = await transactionRepository.getBalance();
    if (transaction.type == 'outcome' && transaction.value > balance.total) {
      throw new Error('Insuficient Funds');
    }

    await transactionRepository.save(transaction);

    return transaction;
  }
}

export default CreateTransactionService;
