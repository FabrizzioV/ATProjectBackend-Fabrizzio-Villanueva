import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { PaymentMsService } from './payment-ms.service';
import { PaymentMethodService } from 'apps/atpmiddleware/src/entities/paymentMethod/paymentMethod.service';
import { TransactionService } from 'apps/atpmiddleware/src/entities/transaction/transaction.service';
import { EventPattern, MessagePattern } from '@nestjs/microservices';
import { Transaction } from 'apps/atpmiddleware/src/entities/transaction/transaction.entity';
import { DefaultIfEmptyInterceptor } from 'apps/atpmiddleware/src/interceptor/DEInterceptor.interceptor';
import { Observable } from 'rxjs';

@Controller()
export class PaymentMsController {
  constructor(private readonly paymentMsService: PaymentMsService,
    private paymentMethodService: PaymentMethodService,
    private transactionService: TransactionService
  ) {}

  @MessagePattern({ cmd: 'get_transactions' })
  getTransaction(id:number): any {
    return this.transactionService.findOne(id);
  }

  @MessagePattern({ cmd: 'get_payments' })
  getPayments(): any {
    return this.paymentMethodService.findAll();
  }

  @MessagePattern({ cmd: 'create_transaction' })
  async postTransaction(transaction:Transaction): Promise<Observable<any>> {
    let tr:any = await this.transactionService.create(transaction);
    return tr;
  }

}
