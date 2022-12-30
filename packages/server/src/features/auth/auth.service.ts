import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { checkPassword } from '../../utils/bcrypt';
import { User } from '../users/user.entity';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);

    if (!user) return null;

    const isSamePassword = await checkPassword(pass, user.password);

    if (isSamePassword) {
      const { password, ...result } = user;
      return result;
    }

    return null;
  }

  async login(user: Partial<User>) {
    return {
      access_token: this.jwtService.sign(user),
      user,
    };
  }

  async validateToken(token: string) {
    const payload = this.jwtService.decode(token) as User;

    const { email } = payload;
    const user = await this.usersService.findByEmail(email);

    if (!user) {
      return null;
    }

    const { password, ...rest } = user;
    return { user: rest };
  }
}
