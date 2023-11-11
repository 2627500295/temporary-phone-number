import { Test, TestingModule } from '@nestjs/testing';
import { NumberController } from './Number.Controller';
import { ReceiveProvider } from '@app/Receives/Receive.Provider';

describe('PhoneController', () => {
  let phoneController: NumberController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [NumberController],
      providers: [ReceiveProvider],
    }).compile();

    phoneController = app.get<NumberController>(NumberController);
  });

  // describe('root', () => {
  //   it('should return "Hello World!"', () => {
  //     expect(phoneController.getHello()).toBe('Hello World!');
  //   });
  // });
});
