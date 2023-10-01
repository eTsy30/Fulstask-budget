import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
  Patch,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';

import { JwtAuthGuard } from 'src/auth/guards/auth.giard';
import { UpdateCategoryDto } from './dto/update-category.dto';
// import { AuthorGuard } from 'src/guard/autor.guard';

@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe())
  create(@Body() createCategoryDto: CreateCategoryDto, @Req() req) {
    return this.categoryService.create(createCategoryDto, +req.user.id);
  }

  @Get()
  @UseGuards(JwtAuthGuard) //TODO обьяснить2
  @UsePipes(new ValidationPipe())
  findAll(@Req() req) {
    return this.categoryService.findAll(+req.user.id);
  }

  @Get(':type/:id')
  @UseGuards(JwtAuthGuard) //AuthorGuard
  @UsePipes(new ValidationPipe())
  findOne(@Param('id') id: string) {
    return this.categoryService.findOne(+id);
  }

  @Patch(':type/:id')
  @UseGuards(JwtAuthGuard) //AuthorGuard
  update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoryService.update(+id, updateCategoryDto);
  }

  @Delete(':type/:id')
  @UseGuards(JwtAuthGuard) //AuthorGuard
  remove(@Param('id') id: string) {
    return this.categoryService.remove(+id);
  }
}
