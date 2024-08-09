import { Controller, Get } from '@nestjs/common';
import { SeatMsService } from './seat-ms.service';
import { SeatService } from 'apps/atpmiddleware/src/entities/seat/seat.service';
import { ClassSeatService } from 'apps/atpmiddleware/src/entities/classSeat/classSeat.service';
import { PlaneTypeService } from 'apps/atpmiddleware/src/entities/planeType/planeType.service';
import { TypeSeatService } from 'apps/atpmiddleware/src/entities/typeSeat/typeSeat.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class SeatMsController {
  constructor(private readonly seatMsService: SeatMsService,
    private seatService: SeatService,
    private classSeatService: ClassSeatService,
    private planeTypeService: PlaneTypeService,
    private typeSeatService: TypeSeatService
  ) {}

  @MessagePattern({ cmd: 'get_seat' })
  getSeats(): any {
    return this.seatService.findAll();
  }

  @MessagePattern({ cmd: 'get_classSeat' })
  getClassSeat(id:number): any {
    return this.classSeatService.findOne(id);
  }

  @MessagePattern({ cmd: 'get_planeTypeOne' })
  getPlaneType(id:string): any {
    return this.planeTypeService.findOne(id);
  }

  @MessagePattern({ cmd: 'get_planeType' })
  getPlaneTypes(): any {
    return this.planeTypeService.findAll();
  }

  @MessagePattern({ cmd: 'get_seatType' })
  getTypeSeat(): any {
    return this.typeSeatService.findAll;
  }

}
