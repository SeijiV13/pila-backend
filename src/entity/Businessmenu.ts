import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Businessmenu {
  @PrimaryColumn()
  public id: number;
  @PrimaryColumn('uniqueidentifier', { nullable: false })
  public businessId: number;
  @PrimaryColumn('uniqueidentifier', { nullable: false })
  public categoryId: number;
  @Column()
  public name: string;
  @Column()
  public description: string;
  @Column()
  public price: number;
  @Column()
  public isDeleted: number;
  @Column()
  public dateCreated: Date;
  @Column()
  public dateModified: Date;
}
