import { Gender } from "./gender";
import { UserRole } from "./user-role";

export interface User {
  id: string;
  name: string;
  email: string;
  telephone: string;
  age: number;
  userRole: UserRole;
  gender: Gender;
}
