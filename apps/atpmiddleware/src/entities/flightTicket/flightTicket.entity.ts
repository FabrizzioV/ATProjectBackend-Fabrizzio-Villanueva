import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity("flightTicket")
export class flightTicket{
    @PrimaryGeneratedColumn()
    ticketId: number;

    @Column()
    flightRoute: number;

    @Column()
    userId: number;

    @Column()
    statusTicketId: number;
    
    @Column()
    seatId: string;
}