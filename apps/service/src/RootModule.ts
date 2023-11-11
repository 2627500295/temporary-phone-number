import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { NumberController } from '@ui/REST/Number.Controller';
import { MessageController } from '@ui/REST/Message.Controller';
import { HomeController } from '@ui/REST/Home.Controller';

import { ReceiveEntity } from '@domain/Entities/Receive.Entity';
import { MessageEntity } from '@domain/Entities/Message.Entity';
import { UserEntity } from '@domain/Entities/User.Entity';
import { SendEntity } from '@domain/Entities/Send.Entity';

import { AppModule } from './App/App.Module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: '178.251.228.30',
      port: 32088,
      username: 'root',
      password: 'jXJCBHQq5kxyH6BPv',
      database: 'sms',
      entityPrefix: 'tpn_',
      entities: [UserEntity, SendEntity, ReceiveEntity, MessageEntity],
      migrations: [],
      synchronize: true,
      logging: true,
    }),
    AppModule,
  ],
  controllers: [HomeController, NumberController, MessageController],
  providers: [],
  exports: [],
})
export class RootModule {}
