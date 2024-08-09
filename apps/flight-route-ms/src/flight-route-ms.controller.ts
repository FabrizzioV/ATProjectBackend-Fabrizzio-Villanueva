import { Controller, Get, Post } from '@nestjs/common';
import { FlightRouteMsService } from './flight-route-ms.service';
import { AirlineService } from 'apps/atpmiddleware/src/entities/airline/airline.service';
import { FlightRouteService } from 'apps/atpmiddleware/src/entities/flightRoute/flightRoute.service';
import { EventPattern, MessagePattern } from '@nestjs/microservices';
import { LocationService } from 'apps/atpmiddleware/src/entities/location/locationD.service';
import { PlaneService } from 'apps/atpmiddleware/src/entities/plane/plane.service';
import { flightRoute } from 'apps/atpmiddleware/src/entities/flightRoute/flightRoute.entity';
import { CountryService } from 'apps/atpmiddleware/src/entities/country/country.service';
import { FlightTicketService } from 'apps/atpmiddleware/src/entities/flightTicket/flightTicket.service';
import { destino } from 'apps/atpmiddleware/src/entities/location/locationD.entity';
import { FlightTicketQuery } from 'apps/atpmiddleware/src/entities/flightTicket/flightTicketQuery.entity';
import { flightTicket } from 'apps/atpmiddleware/src/entities/flightTicket/flightTicket.entity';
import { Transaction } from 'apps/atpmiddleware/src/entities/transaction/transaction.entity';
import { firstValueFrom, map } from 'rxjs';

@Controller()
export class FlightRouteMsController {
  constructor(private readonly flightRouteMsService: FlightRouteMsService,
    private flightRouteService: FlightRouteService,
    private airlineService: AirlineService,
    private planeService: PlaneService,
    private locationService: LocationService,
    private countryService: CountryService,
    private flightTicketService: FlightTicketService,
    ) {}

  @Get()
  getHello() {
    this.flightRouteMsService.getHello();
  }

  @MessagePattern({ cmd: 'get_flights' })
  getFlights(flightRoute:flightRoute): any {
    return this.flightRouteService.findBy(
      flightRoute.originLocation,
      flightRoute.finalLocation,
      flightRoute.flightDate);
  }

  @MessagePattern({ cmd: 'get_flight' })
  getFlight(id): any {
    return this.flightRouteService.findOne(id);
  }

  @MessagePattern({ cmd: 'get_locations' })
  getLocations(): Promise<destino[]> {
    return this.locationService.findAll();
  }

  @MessagePattern({ cmd: 'get_location' })
  getLocation(id:number): Promise<destino> {
    console.log(id)
    return this.locationService.findOne(id);
  }

  @MessagePattern({ cmd: 'airlines' })
  getAirlines(): any {
    return this.airlineService.findAll();
  }

  @MessagePattern({ cmd: 'plane' })
  getPlane(id:number): any {
    return this.planeService.findOne(id);
  }

  @MessagePattern({ cmd: 'countries' })
  getCountries(): any {
    return this.countryService.findAll();
  }

  @MessagePattern({ cmd: 'get_ticket' })
  getTicket(id:number): Promise<FlightTicketQuery[]> {
    return this.flightTicketService.findOne(id);
  }

  @MessagePattern({ cmd: 'create_ticket' })
  async postTicket(data:any) {
    let ticket:flightTicket= await this.flightTicketService.create(data.flightTicket);    
    let flightRoute:flightRoute = await this.flightRouteService.findOne(ticket.flightRoute);
  
    return await this.flightRouteMsService.crearTicket(ticket, data.paymentMethodId, flightRoute)
  }
}
