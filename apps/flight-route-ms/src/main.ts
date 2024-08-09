import { NestFactory } from '@nestjs/core';
import { FlightRouteMsModule } from './flight-route-ms.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

/*Microservicio de vuelos, rutas, reservas*/

async function bootstrap() {
  //const app = await NestFactory.create(FlightRouteMsModule);
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    FlightRouteMsModule,
    {
      transport: Transport.TCP,
      options:{port:3001}
    },
  );
  await app.listen();
}
bootstrap();
