import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("paymentMethod")
export class paymentMethod{
    @PrimaryGeneratedColumn()
    paymentMethodId: number;

    @Column()
    paymentMethodName: string;
}