import { NestFactory } from '@nestjs/core';
import { UserMsModule } from './user-ms.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  
  //const app = await NestFactory.create(UserMsModule);
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    UserMsModule,
    {
      transport: Transport.TCP,
      options: {port:3003}
    },
  );
  await app.listen();
}
bootstrap();
