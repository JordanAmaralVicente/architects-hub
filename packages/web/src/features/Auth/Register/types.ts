import Joi from "joi";
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

export const createUserValidation = Joi.object({
  name: Joi.string(),
  email: Joi.string().email({ tlds: { allow: false } }),
  password: Joi.string(),
  telephone: Joi.string(),
  age: Joi.number().positive(),
  gender: Joi.string(),
  useRole: Joi.string(),
});
