import { PhoneNumberService } from './PhoneNumber.Service';
import { PhoneNumberServiceImpl } from './PhoneNumber.ServiceImpl';
import { ClassProvider } from '@nestjs/common';

export const PhoneNumberProvider: ClassProvider = {
  provide: PhoneNumberService,
  useClass: PhoneNumberServiceImpl,
};
