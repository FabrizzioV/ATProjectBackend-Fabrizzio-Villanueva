import { Module } from '@nestjs/common';
import { SeatMsController } from './seat-ms.controller';
import { SeatMsService } from './seat-ms.service';
import { seat } from 'apps/atpmiddleware/src/entities/seat/seat.entity';
import { typeSeat } from 'apps/atpmiddleware/src/entities/typeSeat/typeSeat.entity';
import { planeType } from 'apps/atpmiddleware/src/entities/planeType/planeType.entity';
import { classSeat } from 'apps/atpmiddleware/src/entities/classSeat/classSeat.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeatService } from 'apps/atpmiddleware/src/entities/seat/seat.service';
import { TypeSeatService } from 'apps/atpmiddleware/src/entities/typeSeat/typeSeat.service';
import { ClassSeatService } from 'apps/atpmiddleware/src/entities/classSeat/classSeat.service';
import { PlaneTypeService } from 'apps/atpmiddleware/src/entities/planeType/planeType.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([seat,typeSeat,planeType,classSeat]),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'fabri',
      password: 'fabri',
      database: 'ATProject',
      entities: [seat,typeSeat,planeType,classSeat],
    }),
  ],
  controllers: [SeatMsController],
  providers: [SeatMsService, SeatService, TypeSeatService, ClassSeatService, PlaneTypeService],
})
export class SeatMsModule {}
