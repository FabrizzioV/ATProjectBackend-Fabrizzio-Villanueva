import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { flightType } from "./flightType.entity";

@Injectable()
export class flightTypeService{
    constructor(
        @InjectRepository(flightType)
        private flightTypeRepository: Repository<flightType>,
    ){}

    findAll(): Promise<flightType[]> {
        return this.flightTypeRepository.find();
      }
    
      findOne(id: number): Promise<flightType> {
        return this.flightTypeRepository.findOne({where:{flightTypeId:id}});
      }
    
      async remove(id: number): Promise<void> {
        await this.flightTypeRepository.delete(id);
      }
    
      async create(flightType: flightType): Promise<flightType> {
        return this.flightTypeRepository.save(flightType);
      }
    
      async update(id: number, flightType: Partial<flightType>): Promise<void> {
        await this.flightTypeRepository.update(id, flightType);
      }
}