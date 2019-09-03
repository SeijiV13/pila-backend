import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    Unique,
    CreateDateColumn,
    UpdateDateColumn
  } from "typeorm";
  import { Length, IsNotEmpty } from "class-validator";

  @Entity()
  export class Business  {

    @PrimaryGeneratedColumn()
    id: string;
    @Column()
    name: string;
    @Column()    
    userId: string;
    @Column()
    category: string;
    @Column()
    logoImageUrl: string;
    @Column()
    dateCreated: Date;
    @Column()
    dateModified: Date;
    
  }