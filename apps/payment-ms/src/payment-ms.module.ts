import { Module } from '@nestjs/common';
import { PaymentMsController } from './payment-ms.controller';
import { PaymentMsService } from './payment-ms.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { paymentMethod } from 'apps/atpmiddleware/src/entities/paymentMethod/paymentMethod.entity';
import { Transaction } from 'apps/atpmiddleware/src/entities/transaction/transaction.entity';
import { PaymentMethodService } from 'apps/atpmiddleware/src/entities/paymentMethod/paymentMethod.service';
import { TransactionService } from 'apps/atpmiddleware/src/entities/transaction/transaction.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([paymentMethod,Transaction]),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'fabri',
      password: 'fabri',
      database: 'ATProject',
      entities: [paymentMethod,Transaction],
    }),
  ],
  controllers: [PaymentMsController],
  providers: [PaymentMsService, PaymentMethodService, TransactionService],
})
export class PaymentMsModule {}
