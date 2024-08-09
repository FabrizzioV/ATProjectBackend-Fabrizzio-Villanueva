import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common';
import { AppService } from './app.service';
import { flightRoute } from './entities/flightRoute/flightRoute.entity';
import { flightTicket } from './entities/flightTicket/flightTicket.entity';
import { user } from './entities/user/user.entity';
import { Transaction } from './entities/transaction/transaction.entity';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('rutas')
  getRoutes(@Body() flightRoute: flightRoute){
    return this.appService.getFlightRoutes(flightRoute);
  }

  @Get('rutas/:id')
  getRoute(@Param('id') id:number){
    return this.appService.getFlightRoute(id);
  }

  @Get('aerolineas')
  getAirlines(){
    return this.appService.getAirlineRoutes();
  }
  
  @Get('destinos')
  getDestino(){
    return this.appService.getDestinations();
  }

  @Get('destinos')
  getDestinos(@Body("id")id){
    return this.appService.getDestination(id);
  }

  @Get('pagos')
  getMetodos(){
    return this.appService.getPagos();
  }

  @Get('tipoAsientos')
  getTipoAsientos(){
    return this.appService.getTipoAsientos();
  }

  @Get('usuario/:id')
  getUser(@Param('id') id:number){
    return this.appService.getUsuario(id);
  }

  @Get('usuario')
  create(@Body()user:user){
    return this.appService.createtUsuario(user);
  }

  @Get('paises')
  getCountries(){
    return this.appService.getPaises();
  }

  @Get('ticket/:id')
  getTicket(@Param('id') id:number){
    return this.appService.getTicket(id);
  }

  @Post('crear-ticket/:id')
  postTicket(@Param('id') paymentMethodId:number,@Body() flightTicket:flightTicket){
    return this.appService.createTicket(flightTicket,paymentMethodId);
  }

  @Post('crear-transaccion')
  postT(@Body() transac:Transaction){
    return this.appService.createTransaction(transac);
  }

  @MessagePattern({ cmd: 'send_payment' })
  async handleSendToPayment(transaction: any) {
    console.log(transaction)
    return await this.appService.createTransaction(transaction);
  }
}
