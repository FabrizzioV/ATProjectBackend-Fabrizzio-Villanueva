import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity("classSeat")
export class classSeat{
    @PrimaryGeneratedColumn()
    classSeatId: number;

    @Column()
    classSeat: string;
}