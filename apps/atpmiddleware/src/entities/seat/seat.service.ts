import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { seat } from "./seat.entity";

@Injectable()
export class SeatService{
    constructor(
        @InjectRepository(seat)
        private seatRepository: Repository<seat>,
    ){}

    findAll(): Promise<seat[]> {
        return this.seatRepository.find();
      }
    
      findOne(id: number): Promise<seat> {
        return this.seatRepository.findOne({where:{seatId:id}});
      }
    
      async remove(id: number): Promise<void> {
        await this.seatRepository.delete(id);
      }
    
      async create(seat: seat): Promise<seat> {
        return this.seatRepository.save(seat);
      }
    
      async update(id: number, seat: Partial<seat>): Promise<void> {
        await this.seatRepository.update(id, seat);
      }
}