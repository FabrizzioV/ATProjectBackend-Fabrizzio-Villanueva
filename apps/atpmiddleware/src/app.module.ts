import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AirlineService } from './entities/airline/airline.service';
import { airline } from './entities/airline/airline.entity';
import { classSeat } from './entities/classSeat/classSeat.entity';
import { flightRoute } from './entities/flightRoute/flightRoute.entity';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { DefaultIfEmptyInterceptor } from './interceptor/DEInterceptor.interceptor';

@Module({
  imports: [
    ClientsModule.register([
      {name:'get_flights', transport: Transport.TCP, options:{port:3001}},
      {name:'get_payments', transport: Transport.TCP, options:{port:3004}},
      {name:'get_users', transport: Transport.TCP, options:{port:3003}},
      {name:'get_seats', transport: Transport.TCP, options:{port:3002}},
    ]),
    TypeOrmModule.forFeature([airline,flightRoute]),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'fabri',
      password: 'fabri',
      database: 'ATProject',
      entities: [airline, classSeat,flightRoute],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
