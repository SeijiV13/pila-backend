import * as bcrypt from 'bcryptjs';
import { IsNotEmpty, MaxLength } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Profile {
  @PrimaryGeneratedColumn()
  public id: string;
  @Column()
  public userId: string;
  @Column()
  @MaxLength(150)
  public firstName: string;
  @Column()
  public middleName: string;
  @Column()
  @MaxLength(150)
  public lastName: string;
  @Column()
  public dateOfBirth: string;
  @Column()
  public gender: string;
  @Column()
  public mobileNumber: string;
  @Column()
  public country: string;
  @Column()
  public state: string;
  @Column()
  public city: string;
  @Column()
  public zipCode: string;
  @Column()
  public profileImageUrl: string;
  @Column()
  public dateCreated: Date;
  @Column()
  public dateModified: Date;
}
