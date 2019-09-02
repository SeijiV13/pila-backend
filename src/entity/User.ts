
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Unique,
  CreateDateColumn,
  UpdateDateColumn
} from "typeorm";
import { Length, IsNotEmpty } from "class-validator";
import * as bcrypt from "bcryptjs";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    email: string;
    @Column()
    username: string;
    @Column()
    password: string;
    @Column()
    lastLoggedIn: Date;
    @Column()
    fbId: string;
    @Column()
    googleId: string;
    @Column()
    isVerified: number;
    @Column()
    status: string;
    @Column()
    dateCreated: Date;
    @Column()
    dateModified: Date;
    @Column()
    role: string;
    hashPassword() {
    this.password = bcrypt.hashSync(this.password, 8);
  }

  checkIfUnencryptedPasswordIsValid(unencryptedPassword: string) {
    return bcrypt.compareSync(unencryptedPassword, this.password);
  }
}
