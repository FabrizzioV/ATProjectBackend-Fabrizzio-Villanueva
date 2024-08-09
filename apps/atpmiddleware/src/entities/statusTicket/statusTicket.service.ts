import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { statusTicket } from "./statusTicket.entity";

@Injectable()
export class StatusTicketService{
    constructor(
        @InjectRepository(statusTicket)
        private statusTicketRepository: Repository<statusTicket>,
    ){}

    findAll(): Promise<statusTicket[]> {
        return this.statusTicketRepository.find();
      }
    
      findOne(id: number): Promise<statusTicket> {
        return this.statusTicketRepository.findOne({where:{statusTicketId:id}});
      }
    
      async remove(id: number): Promise<void> {
        await this.statusTicketRepository.delete(id);
      }
    
      async create(statusTicket: statusTicket): Promise<statusTicket> {
        return this.statusTicketRepository.save(statusTicket);
      }
    
      async update(id: number, statusTicket: Partial<statusTicket>): Promise<void> {
        await this.statusTicketRepository.update(id, statusTicket);
      }
}