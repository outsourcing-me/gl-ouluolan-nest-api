import { Document } from 'mongoose';

export interface IUser extends Document {
  method: string;
  roles: string[];
  local: {
    email: string;
    salt: string;
    hashedPassword: string;
    roles: string[];
  };
}
