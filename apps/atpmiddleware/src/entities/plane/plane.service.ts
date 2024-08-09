import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { plane } from "./plane.entity";

@Injectable()
export class PlaneService{
    constructor(
        @InjectRepository(plane)
        private planeRepository: Repository<plane>,
    ){}

    findAll(): Promise<plane[]> {
        return this.planeRepository.find();
      }
    
      findOne(id: number): Promise<plane> {
        return this.planeRepository.findOne({where:{planeId:id}});
      }
    
      async remove(id: number): Promise<void> {
        await this.planeRepository.delete(id);
      }
    
      async create(plane: plane): Promise<plane> {
        return this.planeRepository.save(plane);
      }
    
      async update(id: number, plane: Partial<plane>): Promise<void> {
        await this.planeRepository.update(id, plane);
      }
}