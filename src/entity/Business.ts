import { IsNotEmpty, Length, MaxLength } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Business {
  @PrimaryGeneratedColumn()
  public id: string;

  @Column()
  @MaxLength(20)
  @IsNotEmpty()
  public name: string;
  @Column()
  public description: string;
  @Column()
  public categoryId: string;
  @Column()
  public logoImageUrl: string;
  @Column()
  public dateCreated: Date;
  @Column()
  public dateModified: Date;
}
