import { IsNotEmpty, MaxLength } from 'class-validator';
import { Field, ID, ObjectType } from 'type-graphql';
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'Profile', synchronize: false })
@ObjectType()
export class Profile extends BaseEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'Id' })
  @Field(() => ID)
  public id: string;

  @Column({ name: 'UserId', type: 'uniqueidentifier' })
  @Field(() => String)
  @IsNotEmpty()
  public userId: string;

  @Column({ name: 'FirstName', type: 'nvarchar', length: 150 })
  @Field(() => String, { nullable: true })
  @IsNotEmpty()
  @MaxLength(150)
  public firstName: string;

  @Column({ name: 'MiddleName', type: 'nvarchar', length: 150, nullable: true })
  @Field(() => String, { nullable: true })
  @MaxLength(150)
  public middleName: string;

  @Column({ name: 'LastName', type: 'nvarchar', length: 150 })
  @Field(() => String, { nullable: true })
  @IsNotEmpty()
  @MaxLength(150)
  public lastName: string;

  @Column({ name: 'DateOfBirth', type: 'datetime2', nullable: true })
  @Field(() => String, { nullable: true })
  public dateOfBirth: string;

  @Column({ name: 'Gender', type: 'nvarchar', nullable: true })
  @Field(() => String, { nullable: true })
  public gender: string;

  @Column({ name: 'MobileNumber', type: 'nvarchar', length: 20, nullable: true })
  @Field(() => String, { nullable: true })
  @MaxLength(20)
  public mobileNumber: string;

  @Column({ name: 'Country', type: 'nvarchar', length: 30, nullable: true })
  @Field(() => String, { nullable: true })
  @MaxLength(30)
  public country: string;

  @Column({ name: 'State', type: 'nvarchar', length: 30, nullable: true })
  @Field(() => String, { nullable: true })
  @MaxLength(30)
  public state: string;

  @Column({ name: 'City', type: 'nvarchar', length: 30, nullable: true })
  @Field(() => String, { nullable: true })
  @MaxLength(30)
  public city: string;

  @Column({ name: 'ZipCode', type: 'nvarchar', length: 8, nullable: true })
  @Field(() => String, { nullable: true })
  @MaxLength(8)
  public zipCode: string;

  @Column({ name: 'ProfileImageUrl', type: 'nvarchar', length: 'MAX', nullable: true })
  @Field(() => String, { nullable: true })
  public profileImageUrl: string;

  @Column({ name: 'CreatedDate', type: 'datetime2', nullable: true })
  @Field(() => String, { nullable: true })
  public createdDate: Date;

  @Column({ name: 'CreatedBy', type: 'nvarchar', length: 50, nullable: true })
  @Field(() => String, { nullable: true })
  @MaxLength(50)
  public createdBy: string;

  @Column({ name: 'UpdatedDate', type: 'datetime2', nullable: true })
  @Field(() => Date, { nullable: true })
  public updatedDate: Date;

  @Column({ name: 'UpdatedBy', type: 'nvarchar', length: 50, nullable: true })
  @Field(() => String, { nullable: true })
  @MaxLength(50)
  public updatedBy: string;
}
