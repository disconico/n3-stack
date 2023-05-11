import { Entity, Column, AfterInsert, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @AfterInsert()
  logInsert() {
    console.log(`Inserted user with id : ${this.id}`);
  }
}
