import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcryptjs';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async register(createUserDto: CreateUserDto): Promise<User> {
    const newUser = this.userRepository.create(createUserDto);
    newUser.password = await bcrypt.hash(newUser.password, 10);
    return await this.userRepository.save(newUser);
  }

  async findOneById(id: number): Promise<User> {
    return this.userRepository.findOne({ where: { id: id } });
  }

  async findByPhoneNumber(phoneNumber: string): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { phoneNumber } });
  }
}
