import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { classSeat } from "./classSeat.entity";

@Injectable()
export class ClassSeatService{
    constructor(
        @InjectRepository(classSeat)
        private classSeatRepository: Repository<classSeat>,
    ){}

    findAll(): Promise<classSeat[]> {
        return this.classSeatRepository.find();
      }
    
      findOne(id: number): Promise<classSeat> {
        return this.classSeatRepository.findOne({where:{classSeatId:id}});
      }
    
      async remove(id: number): Promise<void> {
        await this.classSeatRepository.delete(id);
      }
    
      async create(classSeat: classSeat): Promise<classSeat> {
        return this.classSeatRepository.save(classSeat);
      }
    
      async update(id: number, classSeat: Partial<classSeat>): Promise<void> {
        await this.classSeatRepository.update(id, classSeat);
      }
}