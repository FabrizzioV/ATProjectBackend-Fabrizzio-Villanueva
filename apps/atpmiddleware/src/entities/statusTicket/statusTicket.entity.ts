import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity("statusTicket")
export class statusTicket{
    @PrimaryGeneratedColumn()
    statusTicketId: number;

    @Column()
    statusTicket: string;
}