import * as bcrypt from 'bcryptjs';
import { IsNotEmpty, Length } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  public id: number;
  @Column()
  public email: string;
  @Column()
  @IsNotEmpty()
  @Length(50)
  public username: string;
  @Column()
  public password: string;
  @Column()
  public lastLoggedIn: Date;
  @Column()
  public fbId: string;
  @Column()
  public googleId: string;
  @Column()
  public isVerified: number;
  @Column()
  public status: string;
  @Column()
  public dateCreated: Date;
  @Column()
  public dateModified: Date;
  @Column()
  public role: string;
  public hashPassword() {
    this.password = bcrypt.hashSync(this.password, 8);
  }

  public checkIfUnencryptedPasswordIsValid(unencryptedPassword: string) {
    return bcrypt.compareSync(unencryptedPassword, this.password);
  }
}
