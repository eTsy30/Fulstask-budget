import { InjectRepository } from '@nestjs/typeorm';
import {
  BadGatewayException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { Repository } from 'typeorm';
import { Category } from './entities/category.entity';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepositiry: Repository<Category>,
  ) {}
  async create(createCategoryDto: CreateCategoryDto, id: number) {
    const isExist = await this.categoryRepositiry.findBy({
      user: { id: id },
      title: createCategoryDto.title,
    });
    const dreamCategory = await this.categoryRepositiry.findBy({
      user: { id: id },
      title: 'Dream',
    });
    if (dreamCategory.length === 0) {
      // Если категория "dream" не существует, создаем ее
      const newDreamCategory = {
        title: 'Dream',
        user: { id: id },
      };
      await this.categoryRepositiry.save(newDreamCategory);
    }
    if (isExist.length) {
      throw new BadGatewayException('This category alredy exist');
    }
    const newCategory = {
      title: createCategoryDto.title,
      user: { id: id },
    };
    return await this.categoryRepositiry.save(newCategory);
  }

  async findAll(id: number) {
    return await this.categoryRepositiry.find({
      where: { user: { id: id } },
      relations: {
        transaction: true,
      },
    });
  }

  async findOne(id: number) {
    const category = await this.categoryRepositiry.findOne({
      where: { id },
      relations: {
        user: true,
        transaction: true,
      },
    });
    if (!category) {
      throw new NotFoundException('Category not found');
    }
    return category;
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    const category = await this.categoryRepositiry.findOne({ where: { id } });
    if (!category) {
      throw new NotFoundException('Category not found');
    }
    return await this.categoryRepositiry.update(id, updateCategoryDto); //update(id, updateCategoryDto) наиди категорию с id(первы параметр) и пререзапиши ее updateCategoryDto
  }

  async remove(id: number) {
    const category = await this.categoryRepositiry.findOne({ where: { id } });

    if (!category) {
      throw new NotFoundException('Category not found');
    }
    return await this.categoryRepositiry.delete(id);
  }
}
