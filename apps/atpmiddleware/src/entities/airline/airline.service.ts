import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { airline } from "./airline.entity";
import { Repository } from "typeorm";

@Injectable()
export class AirlineService{
    constructor(
        @InjectRepository(airline)
        private readonly AirlineRepository: Repository<airline>,
    ){}

    findAll(): Promise<airline[]> {
        return this.AirlineRepository.find();
      }
    
      findOne(id: number): Promise<airline> {
        return this.AirlineRepository.findOne({where:{airlineId:id}});
      }
    
      async remove(id: number): Promise<void> {
        await this.AirlineRepository.delete(id);
      }
    
      async create(Airline: airline): Promise<airline> {
        return this.AirlineRepository.save(Airline);
      }
    
      async update(id: number, Airline: Partial<airline>): Promise<void> {
        await this.AirlineRepository.update(id, Airline);
      }
}