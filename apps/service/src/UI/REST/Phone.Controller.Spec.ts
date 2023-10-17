import { Test, TestingModule } from '@nestjs/testing';
import { PhoneController } from './Phone.Controller';
import { PhoneProvider } from '../../App/Phones/Phone.Provider';

describe('PhoneController', () => {
  let phoneController: PhoneController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [PhoneController],
      providers: [PhoneProvider],
    }).compile();

    phoneController = app.get<PhoneController>(PhoneController);
  });

  // describe('root', () => {
  //   it('should return "Hello World!"', () => {
  //     expect(phoneController.getHello()).toBe('Hello World!');
  //   });
  // });
});
