import { Module } from '@nestjs/common';
import { PiggyBankService } from './piggy-bank.service';
import { PiggyBankController } from './piggy-bank.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PiggyBank } from './entities/piggy-bank.entity';
import { BankItem } from './entities/bankItem.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PiggyBank, BankItem])],
  controllers: [PiggyBankController],
  providers: [PiggyBankService],
})
export class PiggyBankModule {}
