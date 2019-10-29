import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Menucategory {
  @PrimaryColumn()
  public id: number;
  @Column()
  public category: string;
}
