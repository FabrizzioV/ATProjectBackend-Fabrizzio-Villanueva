import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { typeSeat } from "./typeSeat.entity";

@Injectable()
export class TypeSeatService{
    constructor(
        @InjectRepository(typeSeat)
        private typeSeatRepository: Repository<typeSeat>,
    ){}

    findAll(): Promise<typeSeat[]> {
        return this.typeSeatRepository.find();
      }
    
      findOne(id: number): Promise<typeSeat> {
        return this.typeSeatRepository.findOne({where:{typeSeatId:id}});
      }
    
      async remove(id: number): Promise<void> {
        await this.typeSeatRepository.delete(id);
      }
    
      async create(typeSeat: typeSeat): Promise<typeSeat> {
        return this.typeSeatRepository.save(typeSeat);
      }
    
      async update(id: number, typeSeat: Partial<typeSeat>): Promise<void> {
        await this.typeSeatRepository.update(id, typeSeat);
      }
}