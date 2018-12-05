import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
} from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 30 })
  name: string;

  @Column({ length: 30 })
  nickname: string;

  @Column('tinyint')
  status: number;

  @ManyToMany(type => User, user => user.roles)
  users: User[];
}
