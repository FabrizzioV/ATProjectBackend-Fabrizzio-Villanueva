import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { planeType } from "./planeType.entity";

@Injectable()
export class PlaneTypeService{
    constructor(
        @InjectRepository(planeType)
        private planeTypeRepository: Repository<planeType>,
    ){}

    findAll(): Promise<planeType[]> {
        return this.planeTypeRepository.find();
      }
    
      findOne(id: string): Promise<planeType> {
        return this.planeTypeRepository.findOne({where:{planeType:id}});
      }
    
      async remove(id: number): Promise<void> {
        await this.planeTypeRepository.delete(id);
      }
    
      async create(planeType: planeType): Promise<planeType> {
        return this.planeTypeRepository.save(planeType);
      }
    
      async update(id: number, planeType: Partial<planeType>): Promise<void> {
        await this.planeTypeRepository.update(id, planeType);
      }
}