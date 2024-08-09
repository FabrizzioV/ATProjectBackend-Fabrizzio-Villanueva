import { Module } from '@nestjs/common';
import { FlightRouteMsController } from './flight-route-ms.controller';
import { FlightRouteMsService } from './flight-route-ms.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { airline } from 'apps/atpmiddleware/src/entities/airline/airline.entity';
import { AirlineService } from 'apps/atpmiddleware/src/entities/airline/airline.service';
import { flightRoute } from 'apps/atpmiddleware/src/entities/flightRoute/flightRoute.entity';
import { FlightRouteService } from 'apps/atpmiddleware/src/entities/flightRoute/flightRoute.service';
import { plane } from 'apps/atpmiddleware/src/entities/plane/plane.entity';
import { destino } from 'apps/atpmiddleware/src/entities/location/locationD.entity';
import { LocationService } from 'apps/atpmiddleware/src/entities/location/locationD.service';
import { PlaneService } from 'apps/atpmiddleware/src/entities/plane/plane.service';
import { flightTicket } from 'apps/atpmiddleware/src/entities/flightTicket/flightTicket.entity';
import { FlightTicketService } from 'apps/atpmiddleware/src/entities/flightTicket/flightTicket.service';
import { country } from 'apps/atpmiddleware/src/entities/country/country.entity';
import { CountryService } from 'apps/atpmiddleware/src/entities/country/country.service';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'transaction_service',
        transport: Transport.TCP,
        options: {
          host: 'localhost',
          port: 3004,
        }
      },
    ]),
    TypeOrmModule.forFeature([airline,flightRoute,destino,plane,flightTicket, country]),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'fabri',
      password: 'fabri',
      database: 'ATProject',
      entities: [flightRoute,airline,destino,plane,flightTicket,
        country
      ],
    }),
  ],
  controllers: [FlightRouteMsController],
  providers: [FlightRouteMsService,AirlineService,FlightRouteService,PlaneService,
              LocationService, FlightTicketService, CountryService],
})
export class FlightRouteMsModule {}
