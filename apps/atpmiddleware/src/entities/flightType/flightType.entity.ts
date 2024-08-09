import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity("flightType")
export class flightType{
    @PrimaryGeneratedColumn()
    flightTypeId: number;

    @Column()
    flightType: string;
}