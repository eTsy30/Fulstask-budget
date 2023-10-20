import { IsNotEmpty, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { User } from 'src/user/entities/user.entity';
import { BankItemDTO } from './bankItem.dto';

export class CreatePiggyBankDto {
  @IsNotEmpty()
  title?: string;

  @IsArray()
  @IsNotEmpty()
  @ValidateNested({ each: true }) // Говорит class-validator о вложенной валидации
  @Type(() => BankItemDTO) // Говорит class-transformer какой тип ожидать в массиве
  bank?: BankItemDTO[];

  @IsNotEmpty()
  user?: User;
}
