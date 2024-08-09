import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy, EventPattern } from '@nestjs/microservices';
import { flightRoute } from './entities/flightRoute/flightRoute.entity';
import { flightTicket } from './entities/flightTicket/flightTicket.entity';
import { paymentMethod } from './entities/paymentMethod/paymentMethod.entity';
import { user } from './entities/user/user.entity';
import { Transaction } from './entities/transaction/transaction.entity';

@Injectable()
export class AppService {

  constructor(
    @Inject('get_flights') private clientb: ClientProxy,
    @Inject('get_payments') private client: ClientProxy,
    @Inject('get_users') private clientc: ClientProxy,
    @Inject('get_seats') private clientd: ClientProxy,
  ){}

  getFlightRoutes(request:flightRoute){
    return this.clientb.send({cmd:'get_flights'},request)
  }

  getFlightRoute(id:number){
    return this.clientb.send({cmd:'get_flight'},id)
  }

  getAirlineRoutes(){ 
    return this.clientb.send({cmd:'airlines'},"")
  }

  getDestination(id){ 
    return this.clientb.send({cmd:'get_location'},id)
  }

  getDestinations(){ 
    return this.clientb.send({cmd:'get_locations'},"")
  }

  getPagos(){ 
    return this.client.send({cmd:'get_payments'},"")
  }

  getTipoAsientos(){
    return this.clientd.send({cmd:'get_planeType'},"")
  }

  getUsuario(id){
    return this.clientc.send({cmd:'get_user'},id)
  }

  createtUsuario(user:user){
    return this.clientc.send({cmd:'create_user'},user)
  }

  getPaises(){
    return this.clientb.send({cmd:'countries'},"")
  }

  getTicket(id: number){
    return this.clientb.send({cmd:'get_ticket'},id)
  }

  createTicket(flightTicket: flightTicket, paymentMethodId:number){
    return this.clientb.send({cmd:'create_ticket'},{flightTicket:flightTicket,paymentMethodId:paymentMethodId})
  }

  createTransaction(transaction:Transaction){
    console.log(transaction)
    return this.client.send({cmd:'create_transaction'},transaction)
  }
}
