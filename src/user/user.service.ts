import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly useRepository: Repository<User>, // useRepository-обращение к сущности БД
    private readonly jwtService: JwtService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const existUser = await this.useRepository.findOne({
      where: {
        email: createUserDto.email,
      },
    });

    if (existUser) {
      throw new BadRequestException('This email already exist');
    }
    const saltRounds = 10;

    const user = await this.useRepository.save({
      email: createUserDto.email,
      password: await bcrypt.hash(createUserDto.password, saltRounds),
    });

    return { user };
  }

  async findOne(email: string) {
    return await this.useRepository.findOne({
      where: {
        email: email,
      },
    });
  }
}
