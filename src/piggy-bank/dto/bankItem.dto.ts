import { IsNotEmpty } from 'class-validator';

export class BankItemDTO {
  @IsNotEmpty()
  id?: number;

  @IsNotEmpty()
  count?: number;

  @IsNotEmpty()
  status?: boolean;
}
