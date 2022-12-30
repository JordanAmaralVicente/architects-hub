import { IsEmail, IsEnum, IsNotEmpty, IsNumber } from 'class-validator';
import { Gender } from '../../../common/types/gender';
import { UserRole } from '../../../common/types/user-role';

export class CreateUserDTO {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  telephone: string;

  @IsEnum(Gender)
  gender: Gender;

  @IsNumber()
  age: number;

  @IsEnum(UserRole)
  userRole: UserRole;
}
