import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity("transactionStatus")
export class transactionStatus{
    @PrimaryGeneratedColumn()
    transactionStatusId: number;

    @Column()
    statusTransaction: string;
}