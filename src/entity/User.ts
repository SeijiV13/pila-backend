import * as bcrypt from 'bcryptjs';
import { IsNotEmpty, MaxLength } from 'class-validator';
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
  public id: string;
  @Column()
  @MaxLength(150)
  public email: string;
  @Column()
  @IsNotEmpty()
  @MaxLength(50)
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
  public isVerified: boolean;
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
