import { object, string, ObjectSchema, array, number } from 'joi';

export const authUserSchema: ObjectSchema = object({
  name: string()
    .required(),
  password: string()
    .alphanum()
    .min(6)
    .max(36)
    .required(),
  roles: array().items(number()),
});
