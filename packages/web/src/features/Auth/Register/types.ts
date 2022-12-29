import { Gender } from "../../../types/gender";
import { UserRole } from "../../../types/user-role";

export interface CreateUserDTO {
  email: string;
  name: string;
  password: string;
  telephone: string;
  gender: Gender;
  age: number;
  userRole: UserRole;
}
