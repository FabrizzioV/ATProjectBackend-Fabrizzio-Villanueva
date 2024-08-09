import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("country")
export class country{
    @PrimaryGeneratedColumn()
    countryId: number;

    @Column()
    country: string;
}