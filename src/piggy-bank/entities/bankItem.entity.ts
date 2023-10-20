import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { PiggyBank } from './piggy-bank.entity';

@Entity()
export class BankItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  count: number;

  @Column()
  status: boolean;

  @ManyToOne(() => PiggyBank, (piggyBank) => piggyBank.bankItems, {
    onDelete: 'CASCADE',
  })
  piggyBank: PiggyBank;
}
