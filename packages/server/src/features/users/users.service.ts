import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserRole } from '../../common/types/user-role';
import { encryptPassword } from '../../utils/bcrypt';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async findById(id: string) {
    return this.usersRepository.findOneByOrFail({ id });
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findOneBy({ email });
  }

  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async createUser(user: Partial<User>) {
    const { password, ...rest } = user;
    const hash = await encryptPassword(password as string);
    return this.usersRepository.save({ ...rest, password: hash });
  }

  async listArchitects() {
    return this.usersRepository.find({
      where: {
        userRole: UserRole.ARCHITECT,
      },
      select: ['id', 'email', 'name', 'telephone', 'age', 'telephone'],
    });
  }
}
