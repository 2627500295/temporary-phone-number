import { Global, Module } from '@nestjs/common';

import { HomeProvider } from '@app/Home/Home.Provider';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReceiveEntity } from '@domain/Entities/Receive.Entity';
import { MessageEntity } from '@domain/Entities/Message.Entity';

import { ReceiveProvider } from '@app/Receives/Receive.Provider';
import { MessageProvider } from './Messages/Message.Provider';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([ReceiveEntity, MessageEntity])],
  controllers: [],
  providers: [HomeProvider, ReceiveProvider, MessageProvider],
  exports: [HomeProvider, ReceiveProvider, MessageProvider],
})
export class AppModule {}
