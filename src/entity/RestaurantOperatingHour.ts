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
  @Field(() => ID)
  public id: string;

  @Column({ name: 'RestaurantId', type: 'uniqueidentifier' })
  // @ManyToMany(type => Restaurant)
  // @JoinColumn()
  @Field(() => String)
  public restaurantId: string;

  @Column({ name: 'OpenTime', type: 'nvarchar', length: 'MAX' })
  @Field(() => String)
  public openTime: string;

  @Column({ name: 'ClosingTime', type: 'nvarchar', length: 'MAX' })
  @Field(() => String)
  public closingTime: string;

  @Column({ name: 'Day', type: 'nvarchar', length: 'MAX' })
  @Field(() => String)
  public day: string;

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
