import { Field, ID, ObjectType } from 'type-graphql';
import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Restaurant } from './Restaurant';
import { User } from './User';

@Entity({ name: 'RestaurantUserAccess', synchronize: false })
@ObjectType()
export class RestaurantUserAccess extends BaseEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'Id' })
  @Field(() => ID)
  public id: string;

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

  @Column({ name: 'Role', type: 'nvarchar', length: 'MAX' })
  @Field(() => String)
  public role: string;

  @Column({ name: 'IsDeleted', type: 'bit' })
  @Field(() => Boolean)
  public isDeleted: boolean;

  @Column({ name: 'IsActive', type: 'bit' })
  @Field(() => Boolean)
  public isActive: boolean;

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
