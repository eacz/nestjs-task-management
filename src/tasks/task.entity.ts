import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { TaskStatus } from './task-status.enum';

@Entity()
export class Task {
  @PrimaryGeneratedColumn('uuid')
  Id: string

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  status: TaskStatus;
}