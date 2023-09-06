import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
// import * as argon2 from 'argon2';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly useRepository: Repository<User>,
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
    const user = await this.useRepository.save({
      email: createUserDto.email,
      password: createUserDto.password, //TODO add hash
    });
    return { user };
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }
}
