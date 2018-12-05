import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Role } from './role.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 30 })
  name: string;

  @Column({ length: 200 })
  salt: string;

  @Column('text')
  password: string;

  @Column('tinyint')
  status: number;

  @ManyToMany(type => Role, role => role.users)
  @JoinTable()
  roles: Role[];
}
