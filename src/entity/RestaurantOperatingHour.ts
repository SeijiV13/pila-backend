import { Field, ID, ObjectType } from 'type-graphql';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Restaurant } from './Restaurant';

@Entity({ name: 'RestaurantOperatingHour', synchronize: false })
@ObjectType()
export class RestaurantOperatingHour extends BaseEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'Id' })
  @Field(() => ID, { nullable: true })
  public id: string;

  @Column({ name: 'RestaurantId', type: 'uniqueidentifier' })
  // @ManyToMany(type => Restaurant)
  // @JoinColumn()
  @Field(() => String, { nullable: true })
  public restaurantId: string;

  @Column({ name: 'OpenTime', type: 'nvarchar', length: 'MAX' })
  @Field(() => String, { nullable: true })
  public openTime: string;

  @Column({ name: 'ClosingTime', type: 'nvarchar', length: 'MAX' })
  @Field(() => String, { nullable: true })
  public closingTime: string;

  @Column({ name: 'Day', type: 'nvarchar', length: 'MAX' })
  @Field(() => String, { nullable: true })
  public day: string;

  @Column({ name: 'CreatedDate', type: 'datetime2' })
  @Field(() => Date, { nullable: true })
  public createdDate: Date;

  @Column({ name: 'CreatedBy', type: 'nvarchar', length: 'MAX' })
  @Field(() => String, { nullable: true })
  public createdBy: string;

  @Column({ name: 'UpdatedDate', type: 'datetime2', nullable: true })
  @Field(() => Date, { nullable: true })
  public updatedDate: Date;

  @Column({ name: 'UpdatedBy', type: 'nvarchar', length: 'MAX', nullable: true })
  @Field(() => String, { nullable: true })
  public updatedBy: string;
}
