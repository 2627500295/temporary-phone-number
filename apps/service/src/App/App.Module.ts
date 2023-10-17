import { Global, Module } from '@nestjs/common';

import { HomeProvider } from '@app/Home/Home.Provider';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PhoneEntity } from '@domain/Entities/Phone.Entity';
import { MessageEntity } from '@domain/Entities/Message.Entity';

import { PhoneProvider } from './Phones/Phone.Provider';
import { MessageProvider } from './Messages/Message.Provider';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([PhoneEntity, MessageEntity])],
  controllers: [],
  providers: [HomeProvider, PhoneProvider, MessageProvider],
  exports: [HomeProvider, PhoneProvider, MessageProvider],
})
export class AppModule {}
