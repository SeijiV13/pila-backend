import { Field, ID, ObjectType } from 'type-graphql';
import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Restaurant } from './Restaurant';

@Entity({ name: 'RestaurantMenu', synchronize: false })
@ObjectType()
export class RestaurantMenu extends BaseEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'Id' })
  @Field(() => ID)
  public id: string;

  @Column({ name: 'RestaurantId', type: 'uniqueidentifier' })
  // @ManyToOne(type => Restaurant)
  // @JoinColumn()
  // @Field(() => String)
  public restaurantId: string;

  @Column({ name: 'MenuName', type: 'nvarchar', length: 'MAX' })
  @Field(() => String)
  public menuName: string;

  @Column({ name: 'Description', type: 'nvarchar', length: 'MAX' })
  @Field(() => String)
  public description: string;

  @Column({ name: 'Thumbnail', type: 'nvarchar', length: 'MAX', nullable: true })
  @Field(() => String)
  public thumbnail: string;

  @Column({ name: 'Images', type: 'nvarchar', length: 'MAX', nullable: true })
  @Field(() => String)
  public images: string;

  @Column({ name: 'Price', type: 'decimal' })
  @Field(() => String)
  public price: number;

  @Column({ name: 'MenuType', type: 'nvarchar', length: 'MAX' })
  @Field(() => String)
  public menuType: string;

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
