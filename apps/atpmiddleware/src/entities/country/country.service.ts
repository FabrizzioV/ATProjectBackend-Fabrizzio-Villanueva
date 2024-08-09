import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { country } from "./country.entity";

@Injectable()
export class CountryService{
    constructor(
        @InjectRepository(country)
        private countryRepository: Repository<country>,
    ){}

      findAll(): Promise<country[]> {
        return this.countryRepository.find();
      }
    
      findOne(id: number): Promise<country> {
        return this.countryRepository.findOne({where:{countryId:id}});
      }
    
      async remove(id: number): Promise<void> {
        await this.countryRepository.delete(id);
      }
    
      async create(country: country): Promise<country> {
        return this.countryRepository.save(country);
      }
    
      async update(id: number, country: Partial<country>): Promise<void> {
        await this.countryRepository.update(id, country);
      }
}