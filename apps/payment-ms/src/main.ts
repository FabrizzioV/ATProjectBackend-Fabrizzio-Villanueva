import { NestFactory } from '@nestjs/core';
import { PaymentMsModule } from './payment-ms.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  //const app = await NestFactory.create(PaymentMsModule);
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    PaymentMsModule,
    {
      transport: Transport.TCP,
      options: {port:3004}
    },
  );
  await app.listen();
}
bootstrap();
