import { ClassProvider } from '@nestjs/common';

import { HomeService } from './Home.Service';
import { HomeServiceImpl } from './Home.ServiceImpl';

export const HomeProvider: ClassProvider = {
  provide: HomeService,
  useClass: HomeServiceImpl,
};
