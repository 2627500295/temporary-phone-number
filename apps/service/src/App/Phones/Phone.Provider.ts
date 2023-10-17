import { PhoneService } from './Phone.Service';
import { PhoneServiceImpl } from './Phone.ServiceImpl';
import { ClassProvider } from '@nestjs/common';

export const PhoneProvider: ClassProvider = {
  provide: PhoneService,
  useClass: PhoneServiceImpl,
};
