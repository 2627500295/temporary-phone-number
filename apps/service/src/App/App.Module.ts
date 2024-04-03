import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PhoneNumberEntity } from '../Domain/Entities/PhoneNumber.Entity';
import { MessageEntity } from '../Domain/Entities/Message.Entity';

import { HomeProvider } from './Home/Home.Provider';
import { PhoneNumberProvider } from './PhoneNumber/PhoneNumber.Provider';
import { MessageProvider } from './Messages/Message.Provider';
import { VoiceProvider } from './Voice/Voice.Provider';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([PhoneNumberEntity, MessageEntity])],
  controllers: [],
  providers: [HomeProvider, PhoneNumberProvider, MessageProvider, VoiceProvider],
  exports: [HomeProvider, PhoneNumberProvider, MessageProvider, VoiceProvider],
})
export class AppModule {}
