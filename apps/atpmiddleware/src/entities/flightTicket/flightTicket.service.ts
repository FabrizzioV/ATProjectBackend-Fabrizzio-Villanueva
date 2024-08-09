import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { flightTicket } from "./flightTicket.entity";
import { FlightTicketQuery } from "./flightTicketQuery.entity";

@Injectable()
export class FlightTicketService{
    constructor(
        @InjectRepository(flightTicket)
        private flightTicketRepository: Repository<flightTicket>,
    ){}

      findAll(): Promise<flightTicket[]> {
        return this.flightTicketRepository.find();
      }
    
      findOne(id: number): Promise<FlightTicketQuery[]> {
        return this.flightTicketRepository.query("SELECT * FROM getFlightTickets("+id+");");
      }
    
      async remove(id: number): Promise<void> {
        await this.flightTicketRepository.delete(id);
      }
    
      async create(flightTicket: flightTicket): Promise<flightTicket> {
        return this.flightTicketRepository.save(flightTicket);
      }
    
      async update(id: number, flightTicket: Partial<flightTicket>): Promise<void> {
        await this.flightTicketRepository.update(id, flightTicket);
      }
}