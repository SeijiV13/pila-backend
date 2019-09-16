import { IsNotEmpty, Length } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Business {
  @PrimaryGeneratedColumn()
  public id: string;

  @Column()
  @Length(20)
  @IsNotEmpty()
  public name: string;
  @Column()
  public userId: string;
  @Column()
  public category: string;
  @Column()
  public logoImageUrl: string;
  @Column()
  public dateCreated: Date;
  @Column()
  public dateModified: Date;
}
