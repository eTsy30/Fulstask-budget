import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  // Delete,
  Req,
  UseGuards,
  ParseIntPipe,
  Delete,
  // Param,
  // Patch,
} from '@nestjs/common';
import { PiggyBankService } from './piggy-bank.service';
import { CreatePiggyBankDto } from './dto/create-piggy-bank.dto';
import { JwtAuthGuard } from 'src/auth/guards/auth.giard';
import { UpdateBankItemDto } from './dto/update-bank-item.dto';

@Controller('piggybank')
export class PiggyBankController {
  constructor(private readonly piggyBankService: PiggyBankService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() createPiggyBankDto: CreatePiggyBankDto, @Req() req) {
    return this.piggyBankService.create(createPiggyBankDto, +req.user.id);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll(@Req() req) {
    return this.piggyBankService.findAll(+req.user.id);
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.piggyBankService.findOne(+id);
  // }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateBankItemDto: UpdateBankItemDto,
  ) {
    return this.piggyBankService.updateBankItem(id, updateBankItemDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.piggyBankService.remove(+id);
  }
}
