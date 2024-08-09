import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity("gate")
export class gate{
    @PrimaryGeneratedColumn()
    gateId: number;

    @Column()
    statusGate: number;
}