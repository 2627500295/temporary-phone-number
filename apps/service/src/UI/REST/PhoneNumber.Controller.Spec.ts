import { Test, TestingModule } from '@nestjs/testing';
import { PhoneNumberController } from './PhoneNumber.Controller';
import { PhoneNumberProvider } from '@app/PhoneNumber/PhoneNumber.Provider';

describe('PhoneController', () => {
  let phoneController: PhoneNumberController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [PhoneNumberController],
      providers: [PhoneNumberProvider],
    }).compile();

    phoneController = app.get<PhoneNumberController>(PhoneNumberController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(phoneController.createPhoneNumber({} as any)).toBe('Hello World!');
    });
  });
});
