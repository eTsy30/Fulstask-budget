import { JwtAuthGuard } from './../auth/guards/auth.giard';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  Query,
} from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { AuthorGuard } from 'src/guard/autor.guard';

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
  @Get(':type/find')
  @UseGuards(JwtAuthGuard)
  findAllBytype(@Req() req, @Param('type') type: string) {
    return this.transactionService.findAllBytype(+req.user.id, type);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll(@Req() req) {
    return this.transactionService.findAll(+req.user.id);
  }

  @Get(':type/:id')
  @UseGuards(JwtAuthGuard, AuthorGuard)
  findOne(@Param('id') id: string) {
    return this.transactionService.findOne(+id);
  }

  @Patch(':type/:id')
  @UseGuards(JwtAuthGuard, AuthorGuard)
  update(
    @Param('id') id: string,
    @Body() updateTransactionDto: UpdateTransactionDto,
  ) {
    return this.transactionService.update(+id, updateTransactionDto);
  }

  @Delete(':type/:id')
  @UseGuards(JwtAuthGuard, AuthorGuard)
  remove(@Param('id') id: string) {
    return this.transactionService.remove(+id);
  }
}
