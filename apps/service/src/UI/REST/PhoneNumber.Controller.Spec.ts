import { Test, TestingModule } from '@nestjs/testing';
import { PhoneNumberController } from './PhoneNumber.Controller';
import { ReceiveProvider } from '@app/Receives/Receive.Provider';

describe('PhoneController', () => {
  let phoneController: PhoneNumberController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [PhoneNumberController],
      providers: [ReceiveProvider],
    }).compile();

    phoneController = app.get<PhoneNumberController>(PhoneNumberController);
  });

  // describe('root', () => {
  //   it('should return "Hello World!"', () => {
  //     expect(phoneController.getHello()).toBe('Hello World!');
  //   });
  // });
});
