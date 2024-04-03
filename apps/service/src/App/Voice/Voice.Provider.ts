import { ClassProvider } from '@nestjs/common';

import { VoiceService } from './Voice.Service';
import { VoiceServiceImpl } from './Voice.ServiceImpl';

export const VoiceProvider: ClassProvider = {
  provide: VoiceService,
  useClass: VoiceServiceImpl,
};
