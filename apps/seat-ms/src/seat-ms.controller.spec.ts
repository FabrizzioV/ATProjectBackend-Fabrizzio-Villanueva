import { Test, TestingModule } from '@nestjs/testing';
import { SeatMsController } from './seat-ms.controller';
import { SeatMsService } from './seat-ms.service';

describe('SeatMsController', () => {
  let seatMsController: SeatMsController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [SeatMsController],
      providers: [SeatMsService],
    }).compile();

    seatMsController = app.get<SeatMsController>(SeatMsController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(seatMsController.getHello()).toBe('Hello World!');
    });
  });
});
