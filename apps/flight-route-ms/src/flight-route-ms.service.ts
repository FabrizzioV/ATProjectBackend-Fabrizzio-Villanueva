import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices';
import { flightRoute } from 'apps/atpmiddleware/src/entities/flightRoute/flightRoute.entity';
import { FlightRouteService } from 'apps/atpmiddleware/src/entities/flightRoute/flightRoute.service';
import { flightTicket } from 'apps/atpmiddleware/src/entities/flightTicket/flightTicket.entity';
import { FlightTicketService } from 'apps/atpmiddleware/src/entities/flightTicket/flightTicket.service';
import { Transaction } from 'apps/atpmiddleware/src/entities/transaction/transaction.entity';
import { firstValueFrom, Observable } from 'rxjs';

@Injectable()
export class FlightRouteMsService {
  flightTicketService: FlightTicketService;
  flightRouteService:FlightRouteService;

  constructor(
    @Inject('transaction_service') private clientT: ClientProxy,
  ) {
  }

  getHello(): string {
    return 'Hello World!';
  }

  async crearTicket(ticket: flightTicket,paymentMethodId:number, flightRoute:flightRoute): Promise<Transaction>{

    let transaction:Transaction=new Transaction();

    transaction.amount=flightRoute.price;
    transaction.paymentMethodId=paymentMethodId;
    transaction.transactionStatusId=1; 
    transaction.ticketId=ticket.ticketId;
    transaction.userId=ticket.userId;

    const res:Transaction = await this.clientT.send({cmd:'create_transaction'},transaction).toPromise()

    return res;

  }

}
