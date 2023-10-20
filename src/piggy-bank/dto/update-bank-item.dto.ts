import { IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateBankItemDto {
  @IsOptional() // Поля необязательны, вы можете оставить только те, которые нужно обновить
  @IsNotEmpty()
  count?: number;

  @IsOptional()
  @IsNotEmpty()
  status?: boolean;
}
