import * as bcrypt from 'bcryptjs';
import { IsNotEmpty, MaxLength } from 'class-validator';
import { Field, ID, ObjectType } from 'type-graphql';
import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Restaurant } from './Restaurant';
import { User } from './User';

@Entity({ name: 'UserQueue', synchronize: false })
@ObjectType()
export class UserQueue extends BaseEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'Id' })
  @Field(() => ID)
  public id: string;

  @Column({ name: 'QueueNumber', type: 'nvarchar', length: 'MAX' })
  @Field(() => String)
  public queueNumber: string;

  @Column({ name: 'RestaurantId', type: 'uniqueidentifier' })
  // @ManyToOne(type => Restaurant)
  // @JoinColumn()
  @Field(() => String)
  public restaurantId: string;

  @Column({ name: 'UserId', type: 'uniqueidentifier' })
  // @ManyToOne(type => User)
  // @JoinColumn()
  @Field(() => String)
  public userId: string;

  @Column({ name: 'MobileNumber', type: 'nvarchar', length: 'MAX' })
  @Field(() => String)
  public mobileNumber: string;

  @Column({ name: 'TransactionFee', type: 'decimal' })
  @Field(() => Number)
  public transactionFee: number;

  @Column({ name: 'SubTotal', type: 'decimal' })
  @Field(() => Number)
  public subTotal: number;

  @Column({ name: 'Total', type: 'decimal' })
  @Field(() => Number)
  public total: number;

  @Column({ name: 'Type', type: 'nvarchar', length: 'MAX' })
  @Field(() => String)
  public type: string;

  @Column({ name: 'Status', type: 'nvarchar', length: 'MAX' })
  @Field(() => String)
  public status: string;

  @Column({ name: 'CreatedDate', type: 'datetime2' })
  @Field(() => Date)
  public createdDate: Date;

  @Column({ name: 'CanceledDate', type: 'datetime2', nullable: true })
  @Field(() => Date)
  public canceledDate: Date;

  @Column({ name: 'QueuedDate', type: 'datetime2', nullable: true })
  @Field(() => Date)
  public queuedDate: Date;
}
