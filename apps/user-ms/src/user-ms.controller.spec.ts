import { Test, TestingModule } from '@nestjs/testing';
import { UserMsController } from './user-ms.controller';
import { UserMsService } from './user-ms.service';

describe('UserMsController', () => {
  let userMsController: UserMsController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [UserMsController],
      providers: [UserMsService],
    }).compile();

    userMsController = app.get<UserMsController>(UserMsController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(userMsController.getHello()).toBe('Hello World!');
    });
  });
});
