import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transaction } from './entities/transaction.entity';
import { UpdateTransactionDto } from './dto/update-transaction.dto';

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(Transaction)
    private readonly transactionRepository: Repository<Transaction>,
  ) {}

  async create(createTransactionDto: CreateTransactionDto, id: number) {
    const newTransaction = {
      title: createTransactionDto.title,
      amount: createTransactionDto.amount,
      type: createTransactionDto.type,
      user: { id: id },
      category: { id: +createTransactionDto.category },
    };
    if (!newTransaction) {
      throw new BadRequestException('Something went wrong');
    }
    return await this.transactionRepository.save(newTransaction);
  }

  async findAll(id: number) {
    const transactionsAll = await this.transactionRepository.find({
      where: { user: { id: id } },
      order: { createAt: 'DESC' }, //сортировка новые вначале
    });
    return transactionsAll;
  }

  async findOne(id: number) {
    const transactionsAll = await this.transactionRepository.findOne({
      where: { id: id },
      relations: { user: true, category: true },
    });
    if (!transactionsAll) {
      throw new BadRequestException('Transactions not found');
    }
    return transactionsAll;
  }

  async update(id: number, updateTransactionDto: UpdateTransactionDto) {
    const transactionsAll = await this.transactionRepository.findOne({
      where: { id: id },
    });
    if (!transactionsAll) {
      throw new BadRequestException('Transactions not found');
    }
    return await this.transactionRepository.update(id, updateTransactionDto);
  }

  async remove(id: number) {
    const transactionsAll = await this.transactionRepository.findOne({
      where: { id: id },
    });
    if (!transactionsAll) {
      throw new BadRequestException('Transactions not found');
    }
    return await this.transactionRepository.delete(id);
  }
  async pagination(id: number, page: number, limit: number) {
    const transactions = await this.transactionRepository.find({
      where: { user: { id } },
      relations: { category: true, user: true },
      order: {
        createAt: 'DESC',
      }, // фильтрация
      take: limit, // фильтрация по лимиту
      skip: (page - 1) * limit,
    });
    return transactions;
  }
  async findAllBytype(id: number, type: string) {
    const transactions = await this.transactionRepository.find({
      where: { user: { id }, type },
    });
    const total = transactions.reduce(
      (acc, transaction) => acc + transaction.amount,
      0,
    );
    return total;
  }
}
