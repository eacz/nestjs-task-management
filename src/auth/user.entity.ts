import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  Id: string

  @Column({ unique: true })
  username: string 

  @Column()
  password: string
}