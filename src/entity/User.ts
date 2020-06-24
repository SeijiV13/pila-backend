import * as bcrypt from 'bcryptjs';
import { IsNotEmpty, MaxLength } from 'class-validator';
import { Field, ID, ObjectType } from 'type-graphql';
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'User', synchronize: true })
@ObjectType()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'Id' })
  @Field(() => ID)
  public id: string;

  @Column({ name: 'Email', type: 'nvarchar', length: 150 })
  @Field(() => String)
  @IsNotEmpty()
  @MaxLength(150)
  public email: string;

  @Column({ name: 'Username', type: 'nvarchar', length: 50 })
  @Field(() => String)
  @IsNotEmpty()
  @MaxLength(50)
  public username: string;

  @Column({ name: 'Password', type: 'nvarchar', length: 250, nullable: true })
  @Field(() => String)
  @MaxLength(250)
  public password: string;

  @Column({ name: 'LastLoggedIn', type: 'datetime2', nullable: true })
  @Field(() => Date)
  public lastLoggedIn: Date;

  @Column({ name: 'FailedAttempts', type: 'datetime2', nullable: true })
  @Field(() => Date)
  public failedAttempts: Date;

  @Column({ name: 'FbId', type: 'nvarchar', length: 250, nullable: true })
  @Field(() => String)
  @MaxLength(250)
  public fbId: string;

  @Column({ name: 'GoogleId', type: 'nvarchar', length: 250, nullable: true })
  @Field(() => String)
  @MaxLength(250)
  public googleId: string;

  @Column({ name: 'IsVerified', type: 'bit' })
  @Field(() => Boolean)
  public isVerified: boolean;

  @Column({ name: 'IsLockedOut', type: 'bit' })
  @Field(() => Boolean)
  public isLockedOut: boolean;

  @Column({ name: 'Status', type: 'nvarchar', length: 20 })
  @Field(() => String)
  @IsNotEmpty()
  @MaxLength(20)
  public status: string;

  @Column({ name: 'Role', type: 'nvarchar', length: 20 })
  @Field(() => String)
  @IsNotEmpty()
  @MaxLength(20)
  public role: string;

  @Column({ name: 'CreatedDate', type: 'datetime2', nullable: true })
  @Field(() => Date)
  public createdDate: Date;

  @Column({ name: 'CreatedBy', type: 'nvarchar', length: 50, nullable: true })
  @Field(() => String)
  @MaxLength(50)
  public createdBy: string;

  @Column({ name: 'UpdatedDate', type: 'datetime2', nullable: true })
  @Field(() => Date)
  public updatedDate: Date;

  @Column({ name: 'UpdatedBy', type: 'nvarchar', length: 50, nullable: true })
  @Field(() => String)
  @MaxLength(50)
  public updatedBy: string;

  public hashPassword() {
    this.password = bcrypt.hashSync(this.password, 8);
  }

  public checkIfUnencryptedPasswordIsValid(unencryptedPassword: string) {
    return bcrypt.compareSync(unencryptedPassword, this.password);
  }
}
