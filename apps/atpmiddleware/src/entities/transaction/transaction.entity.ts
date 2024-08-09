import { Column, Double, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity("transaction")
export class Transaction{
    @PrimaryGeneratedColumn()
    transactionId: number;

    @Column()
    transactionCode: string;

    @Column()
    amount: number;

    @Column()
    userId: number;

    @Column()
    paymentMethodId: number;
    
    @Column()
    ticketId: number;
    
    @Column()
    transactionStatusId: number;
}