import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity("plane")
export class plane{
    @PrimaryGeneratedColumn()
    planeId: number;

    @Column()
    planeCode: string;

    @Column()
    planeType: string;
}