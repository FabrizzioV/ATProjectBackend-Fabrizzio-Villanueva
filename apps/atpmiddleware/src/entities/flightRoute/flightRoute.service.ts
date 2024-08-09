import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { flightRoute } from "./flightRoute.entity";

@Injectable()
export class FlightRouteService{
    constructor(
        @InjectRepository(flightRoute)
        private flightRouteRepository: Repository<flightRoute>,
    ){}

      findAll(): Promise<flightRoute[]> {
        return this.flightRouteRepository.find();
      }
    
      findOne(id: number): Promise<flightRoute> {
        return this.flightRouteRepository.findOne({where:{flightRouteId:id}});
      }

      findBy(o:number,f:number,d:Date): Promise<any> {
        return this.flightRouteRepository.find({
          where:{
            originLocation:o,
            finalLocation:f,
            flightDate:d
          },
          order:{price:
            'ASC'
          }
        });
      }
    
      async remove(id: number): Promise<void> {
        await this.flightRouteRepository.delete(id);
      }
    
      async create(flightRoute: flightRoute): Promise<flightRoute> {
        return this.flightRouteRepository.save(flightRoute);
      }
    
      async update(id: number, flightRoute: Partial<flightRoute>): Promise<void> {
        await this.flightRouteRepository.update(id, flightRoute);
      }
}