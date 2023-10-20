import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePiggyBankDto } from './dto/create-piggy-bank.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PiggyBank } from './entities/piggy-bank.entity';
import { Repository } from 'typeorm/repository/Repository';
import { BankItem } from './entities/bankItem.entity';
import { UpdateBankItemDto } from './dto/update-bank-item.dto';

@Injectable()
export class PiggyBankService {
  constructor(
    @InjectRepository(PiggyBank)
    private readonly piggyBank: Repository<PiggyBank>,
    @InjectRepository(BankItem)
    private readonly piggyItemBank: Repository<BankItem>,
  ) {}

  async create(createPiggyBankDto: CreatePiggyBankDto, id: number) {
    const aaa = createPiggyBankDto.bank.map((itemDto) => {
      const bankItem = {
        count: itemDto.count,
        status: itemDto.status,
      };

      return bankItem;
    });

    const newPiggyBank = {
      title: createPiggyBankDto.title,
      bankItems: aaa,
      user: { id: id },
    };
    if (!newPiggyBank) {
      throw new BadRequestException('Something went wrong');
    }
    return await this.piggyBank.save(newPiggyBank);
  }

  async findAll(id: number) {
    return await this.piggyBank.find({
      where: { user: { id: id } },
      relations: { bankItems: true },
    });
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} piggyBank`;
  // }

  async updateBankItem(id: number, updateBankItemDto: UpdateBankItemDto) {
    // Найти BankItem по id
    const bankItem = await this.piggyItemBank.findOne({ where: { id } });

    // Если BankItem не найден, выбросить исключение
    if (!bankItem) {
      throw new NotFoundException('BankItem not found');
    }

    // Обновить поля, если они предоставлены в DTO
    if (updateBankItemDto.count !== undefined) {
      bankItem.count = updateBankItemDto.count;
    }

    if (updateBankItemDto.status !== undefined) {
      bankItem.status = updateBankItemDto.status;
    }

    return this.piggyItemBank.save(bankItem);
  }

  async remove(id: number) {
    return await this.piggyBank.delete(id);
  }
}
