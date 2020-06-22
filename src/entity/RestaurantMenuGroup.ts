import { Field, ID, ObjectType } from 'type-graphql';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { RestaurantMenu } from './RestaurantMenu';
import { RestaurantMenuGroupCategory } from './RestaurantMenuGroupCategory';

@Entity({ name: 'RestaurantMenuGroup', synchronize: true })
@ObjectType()
export class RestaurantMenuGroup extends BaseEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'Id' })
  @Field(() => ID)
  public id: string;

  @Column({ name: 'MenuId', type: 'uniqueidentifier' })
  @ManyToMany(type => RestaurantMenu)
  @JoinColumn()
  @Field(() => String)
  public menuId: string;

  @Column({ name: 'groupId', type: 'uniqueidentifier' })
  @ManyToMany(type => RestaurantMenuGroupCategory)
  @JoinColumn()
  @Field(() => String)
  public groupId: string;

  @Column({ name: 'CreatedDate', type: 'datetime2' })
  @Field(() => Date)
  public createdDate: Date;

  @Column({ name: 'CreatedBy', type: 'nvarchar', length: 'MAX' })
  @Field(() => Boolean)
  public createdBy: string;
}
