import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity("flightRoute")
export class flightRoute{
    @PrimaryGeneratedColumn()
    flightRouteId: number;

    @Column()
    flightRouteCode: string;

    @Column()
    boardingTime: string;

    @Column()
    originLocation: number;

    @Column()
    finalLocation: number;
    
    @Column()
    planeId: number;
    
    @Column()
    airlineId: number;
    
    @Column()
    gateId: string;

    @Column()
    flightDate: Date;
    
    @Column()
    price: number;
}