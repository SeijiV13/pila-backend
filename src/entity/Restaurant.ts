import { Field, ID, ObjectType } from 'type-graphql';
import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Business } from './Business';

@Entity({ name: 'Restaurant', synchronize: true })
@ObjectType()
export class Restaurant extends BaseEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'Id' })
  @Field(() => ID)
  public id: string;

  @Column({ name: 'BusinessId', type: 'uniqueidentifier' })
  @Field(() => String)
  public businessId: string;

  @Column({ name: 'Name', type: 'nvarchar', length: '150' })
  @Field(() => String)
  public name: string;

  @Column({ name: 'Description', type: 'nvarchar', length: 'MAX' })
  @Field(() => String)
  public description: string;

  @Column({ name: 'Type', type: 'nvarchar', length: 100 })
  @Field(() => String)
  public type: string;

  @Column({ name: 'Cuisines', type: 'nvarchar', length: 'MAX' })
  @Field(() => String)
  public cuisines: string;

  @Column({ name: 'Ambience', type: 'nvarchar', length: 'MAX' })
  @Field(() => String)
  public ambience: string;

  @Column({ name: 'SeatingType', type: 'nvarchar', length: 'MAX' })
  @Field(() => String)
  public seatingType: string;

  @Column({ name: 'ImageUrl', type: 'nvarchar', length: 300, nullable: true })
  @Field(() => String, { nullable: true })
  public imageUrl: string;

  @Column({ name: 'HasSmokingArea', type: 'bit' })
  @Field(() => Boolean)
  public hasSmokingArea: boolean;

  @Column({ name: 'Address', type: 'nvarchar', length: 200 })
  @Field(() => String)
  public address: string;

  @Column({ name: 'Country', type: 'nvarchar', length: 100 })
  @Field(() => String)
  public country: string;

  @Column({ name: 'State', type: 'nvarchar', length: 100 })
  @Field(() => String)
  public state: string;

  @Column({ name: 'City', type: 'nvarchar', length: 100 })
  @Field(() => String)
  public city: string;

  @Column({ name: 'ZipCode', type: 'nvarchar', length: 100 })
  @Field(() => String)
  public zipCode: string;

  @Column({ name: 'Longitudes', type: 'decimal' })
  @Field(() => Number)
  public longitudes: number;

  @Column({ name: 'Latitudes', type: 'decimal' })
  @Field(() => Number)
  public latitudes: number;

  @Column({ name: 'IsDeleted', type: 'bit' })
  @Field(() => Boolean)
  public isDeleted: boolean;

  @Column({ name: 'IsActive', type: 'bit' })
  @Field(() => Boolean)
  public isActive: boolean;

  @Column({ name: 'IsApproved', type: 'bit' })
  @Field(() => Boolean)
  public isApproved: boolean;

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

  @ManyToOne(type => Business)
  @JoinColumn()
  @Field(() => Business)
  public business: Business;
}
