import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("airline")
export class airline extends BaseEntity{
    @PrimaryGeneratedColumn()
    airlineId: number;

    @Column()
    airlineName: string;

    @Column()
    airlineCode: string;
}