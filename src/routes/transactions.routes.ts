import { Router } from 'express';
import { getCustomRepository } from 'typeorm';
import AppError from '../errors/AppError';
import multer from 'multer';
import TransactionsRepository from '../repositories/TransactionsRepository';
import ImportTransactionsService from '../services/ImportTransactionsService';
import CreateTransactionService from '../services/CreateTransactionService';
import DeleteTransactionService from '../services/DeleteTransactionService';

import uploadConfig from '../config/upload';

const transactionsRouter = Router();

const upload = multer(uploadConfig);

transactionsRouter.get('/', async (request, response) => {
  // TODO
  const transactionsRepository = getCustomRepository(TransactionsRepository);
  const transactions = await transactionsRepository.find();

  const balance = await transactionsRepository.getBalance();

  return response.json({ transactions: transactions, balance: balance });
});

transactionsRouter.post('/', async (request, response) => {
  try {
    const { title, value, type, category } = request.body;

    const createTransaction = new CreateTransactionService();

    const transaction = await createTransaction.execute({
      title: title,
      value: value,
      type: type,
      category_name: category,
    });

    return response.json(transaction);

  } catch (error) {
    throw new AppError("Insuficient Funds", 400);
  }
});

transactionsRouter.delete('/:id', async (request, response) => {
  const { id } = request.params;

  const deleteTransactionService = new DeleteTransactionService();

  const transaction = await deleteTransactionService.execute(id);

  return response.json(transaction);
});

transactionsRouter.post('/import', upload.single('file'), async (request, response) => {

  try {
    const filename = request.file.filename;

    const importTransactions = new ImportTransactionsService();

    const transactions = await importTransactions.execute(filename);

    return response.json({ transactions: transactions });
  } catch (error) {
    throw new AppError("Incompatible CSV file", 400);
  }

});

export default transactionsRouter;
