import { ReceiveService } from './Receive.Service';
import { ReceiveServiceImpl } from './Receive.ServiceImpl';
import { ClassProvider } from '@nestjs/common';

export const ReceiveProvider: ClassProvider = {
  provide: ReceiveService,
  useClass: ReceiveServiceImpl,
};
