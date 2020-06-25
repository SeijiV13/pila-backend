import { Field, ID, ObjectType } from 'type-graphql';
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Restaurant } from './Restaurant';

@Entity({ name: 'Business', synchronize: true })
@ObjectType()
export class Business extends BaseEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'Id' })
  @Field(() => ID)
  public id: string;

  @Column({ name: 'Name', type: 'nvarchar', length: 'MAX' })
  @Field(() => String)
  public name: string;

  @Column({ name: 'Description', type: 'nvarchar', length: 'MAX' })
  @Field(() => String)
  public description: string;

  @Column({ name: 'LogoImageUrl', type: 'nvarchar', length: 300, nullable: true })
  @Field(() => String)
  public logoImageUrl: string;

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

  @OneToMany(
    type => Restaurant,
    restaurant => restaurant.business
  )
  @Field(() => [Restaurant])
  public restaurants: Restaurant[];
}
