import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  // UsePipes,
  // ValidationPipe,
  UseGuards,
  Req,
  Query,
} from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { JwtAuthGuard } from 'src/auth/guards/auth.giard';

@Controller('transaction')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}
  @Get('pagination')
  @UseGuards(JwtAuthGuard)
  pagination(
    @Req() req,
    @Query('page') page: number = 1, // c тела запроса
    @Query('limit') limit: number = 3,
  ) {
    return this.transactionService.pagination(+req.user.id, +page, +limit);
  }
  @Post()
  @UseGuards(JwtAuthGuard)
  // @UsePipes(new ValidationPipe()) //TODO разобраться почему не рабоьает
  create(@Body() createTransactionDto: CreateTransactionDto, @Req() req) {
    console.log(createTransactionDto, req.user.id);

    return this.transactionService.create(createTransactionDto, +req.user.id);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll(@Req() req) {
    return this.transactionService.findAll(+req.user.id);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: string) {
    return this.transactionService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  update(
    @Param('id') id: string,
    @Body() updateTransactionDto: UpdateTransactionDto,
  ) {
    return this.transactionService.update(+id, updateTransactionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.transactionService.remove(+id);
  }
}
