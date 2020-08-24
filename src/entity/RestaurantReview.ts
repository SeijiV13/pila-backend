import { Field, ID, ObjectType } from 'type-graphql';
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'RestaurantReview', synchronize: false })
@ObjectType()
export class RestaurantReview extends BaseEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'Id' })
  @Field(() => ID)
  public id: string;

  @Column({ name: 'UserId', type: 'uniqueidentifier' })
  @Field(() => String)
  public userId: string;

  @Column({ name: 'RestaurantId', type: 'uniqueidentifier' })
  @Field(() => String)
  public restaurantId: string;

  @Column({ name: 'Rating', type: 'int' })
  @Field(() => Number)
  public rating: number;

  @Column({ name: 'Comment', type: 'nvarchar', length: 'MAX', nullable: true })
  @Field(() => String)
  public comment: string;

  @Column({ name: 'CreatedDate', type: 'datetime2' })
  @Field(() => Date)
  public createdDate: Date;
}
