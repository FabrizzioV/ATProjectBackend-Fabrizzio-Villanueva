import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { destino } from "./locationD.entity";

@Injectable()
export class LocationService{
    constructor(
        @InjectRepository(destino)
        private locationRepository: Repository<destino>,
    ){}

    findAll(): Promise<destino[]> {
        return this.locationRepository.find();
      }
    
      findOne(id: number): Promise<destino> {
        return this.locationRepository.findOne({where:{locationId:id}});
      }
    
      async remove(id: number): Promise<void> {
        await this.locationRepository.delete(id);
      }
    
      async create(location: destino): Promise<destino> {
        return this.locationRepository.save(location);
      }
    
      async update(id: number, location: Partial<destino>): Promise<void> {
        await this.locationRepository.update(id, location);
      }
}