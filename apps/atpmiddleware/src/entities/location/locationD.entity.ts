import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("location")
export class destino{
    @PrimaryGeneratedColumn()
    locationId: number;

    @Column()
    location: string;

    @Column()
    flightTypeId: string;

    @Column()
    countryId: string;
    
    @Column()
    airportCode: string;
}