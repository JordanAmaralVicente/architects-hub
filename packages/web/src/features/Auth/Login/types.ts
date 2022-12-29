import Joi from "joi";

export interface LoginDTO {
  email: string;
  password: string;
}

export const loginValidation = Joi.object({
  email: Joi.string().email({ tlds: { allow: false } }),
  password: Joi.string(),
});
