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

@Entity({ name: 'RestaurantSpecialSchedule', synchronize: false })
@ObjectType()
export class RestaurantSpecialSchedule extends BaseEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'Id' })
  @Field(() => ID)
  public id: string;

  @Column({ name: 'RestaurantId', type: 'uniqueidentifier' })
  // @ManyToMany(type => Restaurant)
  // @JoinColumn()
  @Field(() => String)
  public restaurantId: string;

  @Column({ name: 'ScheduledDate', type: 'datetime2' })
  @Field(() => Date)
  public scheduledDate: Date;

  @Column({ name: 'OpenTime', type: 'nvarchar', length: 'MAX' })
  @Field(() => String)
  public openTime: string;

  @Column({ name: 'ClosingTime', type: 'nvarchar', length: 'MAX' })
  @Field(() => String)
  public closingTime: string;

  @Column({ name: 'IsWholeDay', type: 'bit' })
  @Field(() => Boolean)
  public isWholeDay: boolean;

  @Column({ name: 'CreatedDate', type: 'datetime2' })
  @Field(() => Date)
  public createdDate: Date;

  @Column({ name: 'CreatedBy', type: 'nvarchar', length: 'MAX' })
  @Field(() => String)
  public createdBy: string;

  @Column({ name: 'UpdatedDate', type: 'datetime2', nullable: true })
  @Field(() => Date)
  public updatedDate: Date;

  @Column({ name: 'UpdatedBy', type: 'nvarchar', length: 'MAX', nullable: true })
  @Field(() => String)
  public updatedBy: string;
}
