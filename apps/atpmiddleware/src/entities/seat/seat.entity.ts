import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity("seat")
export class seat{
    @PrimaryColumn()
    seatId: number;

    @Column()
    column: string;

    @Column()
    row: number;

    @Column()
    typeSeatId: number;

    @Column()
    classSeatId: number;
    
    @Column()
    planeType: string;
}