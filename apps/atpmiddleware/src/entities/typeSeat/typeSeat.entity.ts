import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity("typeSeat")
export class typeSeat{
    @PrimaryGeneratedColumn()
    typeSeatId: number;

    @Column()
    typeSeat: string;
}