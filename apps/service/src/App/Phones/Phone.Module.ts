import { Module } from '@nestjs/common';
import { PhoneController } from '../../UI/REST/Phone.Controller';
import { PhoneProvider } from './Phone.Provider';

@Module({
  imports: [],
  controllers: [PhoneController],
  providers: [PhoneProvider],
  exports: [PhoneProvider],
})
export class PhoneModule {}
