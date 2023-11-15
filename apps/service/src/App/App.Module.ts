import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PhoneNumberEntity } from '@domain/Entities/PhoneNumber.Entity';
import { MessageEntity } from '@domain/Entities/Message.Entity';

import { HomeProvider } from './Home/Home.Provider';
import { PhoneNumberProvider } from './PhoneNumber/PhoneNumber.Provider';
import { MessageProvider } from './Messages/Message.Provider';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([PhoneNumberEntity, MessageEntity])],
  controllers: [],
  providers: [HomeProvider, PhoneNumberProvider, MessageProvider],
  exports: [HomeProvider, PhoneNumberProvider, MessageProvider],
})
export class AppModule {}
