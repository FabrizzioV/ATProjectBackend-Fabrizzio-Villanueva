import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { gate } from "./gate.entity";

@Injectable()
export class GateService{
    constructor(
        @InjectRepository(gate)
        private gateRepository: Repository<gate>,
    ){}

    findAll(): Promise<gate[]> {
        return this.gateRepository.find();
      }
    
      findOne(id: number): Promise<gate> {
        return this.gateRepository.findOne({where:{gateId:id}});
      }
    
      async remove(id: number): Promise<void> {
        await this.gateRepository.delete(id);
      }
    
      async create(gate: gate): Promise<gate> {
        return this.gateRepository.save(gate);
      }
    
      async update(id: number, gate: Partial<gate>): Promise<void> {
        await this.gateRepository.update(id, gate);
      }
}