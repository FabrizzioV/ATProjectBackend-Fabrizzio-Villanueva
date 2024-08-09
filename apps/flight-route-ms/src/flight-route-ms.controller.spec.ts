import { Test, TestingModule } from '@nestjs/testing';
import { FlightRouteMsController } from './flight-route-ms.controller';
import { FlightRouteMsService } from './flight-route-ms.service';

describe('FlightRouteMsController', () => {
  let flightRouteMsController: FlightRouteMsController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [FlightRouteMsController],
      providers: [FlightRouteMsService],
    }).compile();

    flightRouteMsController = app.get<FlightRouteMsController>(FlightRouteMsController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(flightRouteMsController.getHello()).toBe('Hello World!');
    });
  });
});
