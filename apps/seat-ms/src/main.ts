import { NestFactory } from '@nestjs/core';
import { SeatMsModule } from './seat-ms.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    SeatMsModule,
    {
      transport: Transport.TCP,
      options:{port:3002}
    },
  );
  await app.listen();
}
bootstrap();
