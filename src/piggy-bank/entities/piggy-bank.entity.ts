import { User } from 'src/user/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BankItem } from './bankItem.entity';

@Entity()
export class PiggyBank {
  @PrimaryGeneratedColumn({ name: 'bank_id' })
  id: number;

  @Column()
  title: string;

  @ManyToOne(() => User, (user) => user.bank, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToMany(() => BankItem, (bankItem) => bankItem.piggyBank, {
    cascade: true,
  })
  @JoinColumn({ name: 'piggyBank_id' })
  bankItems: BankItem[]; // Используйте массив BankItem
}
