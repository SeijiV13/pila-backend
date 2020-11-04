import { Field, ID, ObjectType } from 'type-graphql';
import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Restaurant } from './Restaurant';

@Entity({ name: 'RestaurantGallery', synchronize: false })
@ObjectType()
export class RestaurantGallery extends BaseEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'Id' })
  @Field(() => ID)
  public id: string;

  @Column({ name: 'RestaurantId', type: 'uniqueidentifier' })
  public restaurantId: string;

  @Column({ name: 'OriginalImageUrl', type: 'nvarchar', length: '500', nullable: false })
  @Field(() => String)
  public originalImageUrl: string;

  @Column({ name: 'OptimizedImageUrl', type: 'nvarchar', length: '500', nullable: false })
  @Field(() => String)
  public optimizedImageUrl: string;

  @Column({ name: 'IsDeleted', type: 'bit' })
  @Field(() => Boolean)
  public isDeleted: boolean;

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
