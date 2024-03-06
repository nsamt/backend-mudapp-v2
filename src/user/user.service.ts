import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { FindManyOptions, Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async create(user: CreateUserDto) {
    return this.userRepository.save(this.userRepository.create(user));
    //return 'This action adds a new user';
  }

  findAll(limit: string) {
    let options: FindManyOptions<User>;
    if (limit) options = { take: +limit };
    return this.userRepository.find(options);
    // return `This action returns all user`;
  }

  async findUser(username: string): Promise<User> {
    return this.userRepository.findOneBy({ username });
    // return User;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async updateUser(userId: number, user: UpdateUserDto) {
    // return `This action updates a #${id} user`;
    const update = await this.userRepository.update({ id: userId }, user);
    if (update) return { message: 'updated ok' };
  }

  async removeUser(userId: string) {
    // return `This action removes a #${userId} user`;
    const deleteUser = await this.userRepository.delete({ id: +userId });
    if (deleteUser) return { message: 'removed' };
  }
}
