import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Businesscategory {
  @PrimaryColumn()
  public id: number;
  @Column()
  public category: string;
}
