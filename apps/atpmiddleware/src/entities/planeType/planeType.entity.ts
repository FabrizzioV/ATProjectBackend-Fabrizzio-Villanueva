import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity("planeType")
export class planeType{
    @PrimaryGeneratedColumn()
    planeType: string;

    @Column()
    brand: string;
}