import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity("user")
export class user{
    @PrimaryGeneratedColumn()
    userId: number;

    @Column()
    userEmail: string;

    @Column()
    userName: string;

    @Column()
    userLastName: number;

    @Column()
    birthDate: number;
    
    @Column()
    userPhone: number;
}